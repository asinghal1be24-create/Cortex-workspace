import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { checkRateLimit, createRateLimitResponse } from "@/lib/rateLimit";
import { filesBatchSchema, sanitizeInputText } from "@/lib/validation";
import { securityLog } from "@/lib/logger";

// Initialize Supabase client using Service Role key to bypass RLS policies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(
  supabaseUrl || "https://dummy.supabase.co",
  supabaseServiceKey || "dummy_key"
);

// Helper to map Clerk user ID string deterministically to a valid UUID format
function getUuidFromClerkId(clerkId: string): string {
  const hash = crypto.createHash("md5").update(clerkId).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20, 32)}`;
}

// Helper to identify file type by extension
function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "csv") return "csv";
  if (ext === "canvas") return "canvas";
  if (ext === "code") return "code";
  return "text";
}

// ── GET: Fetch all files for active Clerk user ─────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      securityLog({
        event: "UNAUTHORIZED_ACCESS",
        path: "/api/files [GET]",
        message: "Unauthenticated attempt to access files API",
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limiting Check (60 requests per minute)
    const rateLimit = checkRateLimit(req, "/api/files [GET]", 60, 60_000, userId);
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit) as NextResponse;
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      securityLog({
        event: "SYSTEM_ERROR",
        path: "/api/files [GET]",
        message: "SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables",
      });
      return NextResponse.json({ error: "Database configuration missing on server" }, { status: 500 });
    }

    const uuid = getUuidFromClerkId(userId);

    const { data, error } = await supabaseAdmin
      .from("files")
      .select("*")
      .eq("user_id", uuid)
      .order("updated_at", { ascending: false });

    if (error) {
      securityLog({
        event: "SYSTEM_ERROR",
        path: "/api/files [GET]",
        userId,
        details: { errorMessage: error.message },
        message: "Database error fetching user files",
      });
      return NextResponse.json({ error: "Failed to retrieve files." }, { status: 500 });
    }

    const mapped = (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      content: row.content ?? "",
    }));

    return NextResponse.json(mapped);
  } catch (e: any) {
    securityLog({
      event: "SYSTEM_ERROR",
      path: "/api/files [GET]",
      details: { errorMessage: e?.message },
      message: "Unexpected error in GET files route handler",
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ── POST: Batch upsert files & delete files in transaction ─────────────────────
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      securityLog({
        event: "UNAUTHORIZED_ACCESS",
        path: "/api/files [POST]",
        message: "Unauthenticated attempt to modify files",
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limiting Check (60 requests per minute)
    const rateLimit = checkRateLimit(req, "/api/files [POST]", 60, 60_000, userId);
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit) as NextResponse;
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Database configuration missing on server" }, { status: 500 });
    }

    const uuid = getUuidFromClerkId(userId);

    const rawBody = await req.json().catch(() => ({}));
    const parseResult = filesBatchSchema.safeParse(rawBody);

    if (!parseResult.success) {
      securityLog({
        event: "INVALID_INPUT",
        path: "/api/files [POST]",
        userId,
        details: { errors: parseResult.error.format() },
        message: "Invalid payload structure sent to files API",
      });
      return NextResponse.json(
        {
          error: "Invalid Request Payload",
          details: parseResult.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const { files = [], deletedFileIds = [] } = parseResult.data;

    // 1. Perform batch upsert
    if (files.length > 0) {
      const rowsToUpsert = files.map((f: any) => ({
        id: f.id,
        name: sanitizeInputText(f.name, 255),
        content: f.content,
        type: getFileType(f.name),
        user_id: uuid,
        updated_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabaseAdmin
        .from("files")
        .upsert(rowsToUpsert, { onConflict: "id" });

      if (upsertError) {
        securityLog({
          event: "SYSTEM_ERROR",
          path: "/api/files [POST]",
          userId,
          details: { errorMessage: upsertError.message },
          message: "Database error during file batch upsert",
        });
        return NextResponse.json({ error: "Failed to save files." }, { status: 500 });
      }
    }

    // 2. Perform deletions
    if (deletedFileIds.length > 0) {
      const { error: deleteError } = await supabaseAdmin
        .from("files")
        .delete()
        .in("id", deletedFileIds)
        .eq("user_id", uuid);

      if (deleteError) {
        securityLog({
          event: "SYSTEM_ERROR",
          path: "/api/files [POST]",
          userId,
          details: { errorMessage: deleteError.message },
          message: "Database error deleting files",
        });
        return NextResponse.json({ error: "Failed to delete files." }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    securityLog({
      event: "SYSTEM_ERROR",
      path: "/api/files [POST]",
      details: { errorMessage: e?.message },
      message: "Unexpected error in POST files route handler",
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
