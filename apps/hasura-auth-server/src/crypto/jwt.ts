import * as jose from "jose";
import {createKeyPair} from ".";

export async function generateJWT(id: string, expire = "24h", roles: string[] = ["user"]): Promise<string> {
    const {privateKey} = await createKeyPair();
    const payload = {
        "sub": id,
        "user": {
            roles,
        }
    };
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({alg: "EdDSA"})
        .setIssuedAt()
        .setIssuer("urn:powix:auth")
        .setExpirationTime(expire)
        .sign(privateKey);
    return jwt;
}
