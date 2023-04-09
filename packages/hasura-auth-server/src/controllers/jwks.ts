import {Request, Response} from "express";
import {asJWK} from "../crypto";
import packageJson from "../../package.json";


/**
 * Generates a JWK and returns it as a JSON object
 */
export const jwk = async (req: Request, res: Response) => {
    const jwk = await asJWK();
    const jwks = {
        keys: [jwk]
    };
    res.status(200).send(jwks);
};

/*
 * Generates config with public key and version number
 *  and returns it as a JSON object
 */

export const config = async (req: Request, res: Response) => {
    const jwk = await asJWK();
    const config = {
        "publicKey": Buffer.from(jwk.x, "base64").toString("hex"),
        "version": packageJson.version
    };
    res.status(200).send(config);
};
