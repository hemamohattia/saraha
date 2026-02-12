import crypto from "crypto";

export const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

export const encryptWithPublicKey = (data) =>
  crypto.publicEncrypt(publicKey, Buffer.from(data)).toString("base64");

export const decryptWithPrivateKey = (data) =>
  crypto.privateDecrypt(privateKey, Buffer.from(data, "base64")).toString();