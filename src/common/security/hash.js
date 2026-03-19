import argon2 from "argon2";

export const hashPassword = async (password) =>
  await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

export const comparePassword = async (password, hash) =>
  await argon2.verify(hash, password);