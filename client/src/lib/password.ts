import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function looksHashed(value: string) {
  // bcrypt hashes typically start with $2a$, $2b$, $2y$
  return /^\$2[aby]\$\d{2}\$/.test(value);
}
