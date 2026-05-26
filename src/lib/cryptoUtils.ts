export type VaultPayload = {
  salt: string; // base64 encoded
  iv: string; // base64 encoded
  ciphertext: string; // base64 encoded
};

// Security enhancement: Wipes typed array from memory before GC
export function wipeFromMemory(buffer: Uint8Array) {
  // Instantly overwrites the exact memory addresses with zeros
  buffer.fill(0);
}

export function base64ToUint8Array(base64: string): Uint8Array {
  // Handle environments like Next.js SSR vs Browser
  if (typeof window === 'undefined') {
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  if (typeof window === 'undefined') {
    return Buffer.from(bytes).toString('base64');
  }
  let binaryString = '';
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}

// Derive AES-GCM key from password and salt
async function deriveAesGcmKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function attemptUnlock(
  password: string,
  realPayload: VaultPayload,
  dummyPayload: VaultPayload
): Promise<any> {
  // We use Uint8Array here so we can explicitly wipe them later
  const realCiphertext = base64ToUint8Array(realPayload.ciphertext);
  const dummyCiphertext = base64ToUint8Array(dummyPayload.ciphertext);
  const realIv = base64ToUint8Array(realPayload.iv);
  const dummyIv = base64ToUint8Array(dummyPayload.iv);
  const realSalt = base64ToUint8Array(realPayload.salt);
  const dummySalt = base64ToUint8Array(dummyPayload.salt);

  let realSuccess = false;
  let dummySuccess = false;
  let decryptedData = null;

  try {
    const realKey = await deriveAesGcmKey(password, realSalt);
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: realIv as BufferSource },
      realKey,
      realCiphertext as BufferSource
    );
    // Success on real vault
    realSuccess = true;
    decryptedData = JSON.parse(new TextDecoder().decode(decryptedBuffer));
  } catch (e) {
    // Auth Tag failed for real vault. Proceed silently.
  }

  if (!realSuccess) {
    try {
      const dummyKey = await deriveAesGcmKey(password, dummySalt);
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: dummyIv as BufferSource },
        dummyKey,
        dummyCiphertext as BufferSource
      );
      // Success on dummy vault
      dummySuccess = true;
      decryptedData = JSON.parse(new TextDecoder().decode(decryptedBuffer));
    } catch (e) {
      // Auth Tag failed for dummy vault too.
    }
  }

  if (realSuccess) {
    wipeFromMemory(dummyCiphertext);
    return decryptedData;
  }

  if (dummySuccess) {
    // CRITICAL: Wiping real payload from RAM when burner key is used
    wipeFromMemory(realCiphertext);
    return decryptedData;
  }

  throw new Error("Invalid Vault Credentials");
}

export async function encryptPayload(password: string, data: any): Promise<VaultPayload> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesGcmKey(password, salt);

  const enc = new TextEncoder();
  const encodedData = enc.encode(JSON.stringify(data));

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    encodedData
  );

  return {
    salt: uint8ArrayToBase64(salt),
    iv: uint8ArrayToBase64(iv),
    ciphertext: uint8ArrayToBase64(new Uint8Array(ciphertextBuffer))
  };
}
