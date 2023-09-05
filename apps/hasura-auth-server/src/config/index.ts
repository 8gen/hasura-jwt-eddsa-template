/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Joi from "joi";
import dotenv from "dotenv";
import findConfig from "find-config";

interface Schema {
    NODE_ENV: string;
    PORT: number;
    PRIVATE_KEY: Buffer;
    HOST: string;
}

const schema = Joi.object().keys({
    NODE_ENV: Joi.string().valid("development", "production").default("development"),
    PORT: Joi.number().default(3000),
    PRIVATE_KEY: Joi.binary().encoding("hex").length(32 + 16).required(),
    HOST: Joi.string().default("localhost"),
}).options({stripUnknown: true});

const dotenvPath = findConfig(`.env.${process.env.NODE_ENV}`);
if (!dotenvPath) {
    console.error(`Could not find env.${process.env.NODE_ENV} file, skip`);
    dotenv.config({});
} else {
    dotenv.config({path: dotenvPath});
}

const result = schema.validate(process.env);

if (result.error) {
    for (const err of result.error.details) {
        console.error("Error in env", err.message);
    }
    process.exit(1);
}

export default result.value as Schema;
