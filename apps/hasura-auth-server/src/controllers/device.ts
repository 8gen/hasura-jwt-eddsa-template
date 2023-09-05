import {celebrate, Segments} from "celebrate";
import {Request, Response} from "express";
import Joi from "joi";
import {generateJWT} from "../crypto/jwt";


/**
 * GET /api/v1/device/issue
 *
 * Generates a JWT and returns it as a JSON object
 */
export const issue = [
    celebrate({
        [Segments.BODY]: Joi.object({
            address: Joi.string().required(),
        }),
    }),
    async (req: Request, res: Response) => {
        const jwt = await generateJWT(req.body.address);
        res.status(200).send({token: jwt});
    }
];

export const mock_issue = [
    async (req: Request, res: Response) => {
        const vitalikETH = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
        const jwt = await generateJWT(vitalikETH);
        res.status(200).send({token: jwt});
    }
];
