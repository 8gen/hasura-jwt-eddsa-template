import {Request, Response} from "express";
import {generateJwk} from "../crypto";


/**
 * GET /api/v1/device/issue
 *
 * Generates a JWK and returns it as a JSON object
 */
export const issue = async (req: Request, res: Response) => {
    const jwk = await generateJwk();
    const jwks = {
        keys: [jwk]
    };
    res.status(200).send(jwks);
};
