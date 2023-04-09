import crypto from "crypto";

import config from "../config";


export interface JWK {
    kid: string
    alg: "EdDSA"
    use?: "sig"
    kty: "OKP"
    crv: "Ed25519"
    x: string
}

export const fromRawPrivateKey = async (rawPrivateKey: Buffer) => {
    return crypto.createPrivateKey({format: "der", key: rawPrivateKey, type: "pkcs8"});
};

export const createKeyPair = async (): Promise<{privateKey: crypto.KeyObject, publicKey: crypto.KeyObject}> => {
    const privateKey = await fromRawPrivateKey(config.PRIVATE_KEY);
    const publicKey = crypto.createPublicKey(privateKey);
    return {privateKey, publicKey};
};

export const sign = async (message: string): Promise<string> => {
    const {privateKey} = await createKeyPair();
    const signature = crypto.sign(null, Buffer.from(message), privateKey);
    return signature.toString("hex");
};


export const verify = async (message: string, signature: string): Promise<boolean> => {
    const {publicKey} = await createKeyPair();
    return crypto.verify(null, Buffer.from(message), publicKey, Buffer.from(signature, "hex"));
};

export const asPEM = async (): Promise<string> => {
    const {publicKey} = await createKeyPair();
    return publicKey.export({
        format: "pem",
        type: "spki"
    }).toString();
};

export const asJWK = async (): Promise<JWK> => {
    const {publicKey} = await createKeyPair();
    const jwk = publicKey.export({
        format: "jwk"
    });
    if (jwk.x === undefined) {
        throw new Error("Failed to derive public key");
    }

    const keyId = crypto.createHash("sha256").update(jwk.x).digest("base64");
    if (!keyId.trim()) {
        throw new Error("KeyId cannot be empty");
    }

    if (jwk.crv !== "Ed25519" || jwk.kty !== "OKP" || !jwk.x) {
        throw new Error("Key is not EdDSA-Ed25519");
    }
    return {
        alg: "EdDSA",
        kid: keyId,
        kty: jwk.kty,
        crv: jwk.crv,
        x: jwk.x
    };
};
