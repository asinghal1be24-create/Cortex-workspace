'use client';

import { useUser, useClerk } from "@clerk/nextjs";

export function useAuth() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Map Clerk user structure to the expected interface:
  const mappedUser = user ? {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? "",
  } : null;

  return {
    user: mappedUser,
    session: user ? { user: mappedUser } : null,
    loading: !isLoaded,
    signOut: async () => {
      await signOut();
    }
  };
}
