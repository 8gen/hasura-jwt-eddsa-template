import {Request, Response} from "express";
import {celebrate, Joi, Segments} from "celebrate";
import {generateJWT} from "../crypto/jwt";

/**
 * POST /api/v1/user/issue
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
// /**
//  * Sign in using username and password and returns JWT
//  */
// exports.postLogin = async(req, res, next) => {
//     req.assert("username", "Username is not valid").notEmpty();
//     req.assert("password", "Password cannot be blank").notEmpty();
//
//     const errors = req.validationErrors();
//
//     if (errors) {
//         return res.status(400).json({errors: errors});
//     }
//
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return handleResponse(res, 400, {error: err});
//         }
//         if (user) {
//             handleResponse(res, 200, user.getUser());
//         }
//     })(req, res, next);
// };
//
// /**
//  * POST /signup
//  * Create a new local account
//  */
// exports.postSignup = async(req, res, next) => {
//     req.assert("username", "Username is not valid").notEmpty();
//     req.assert("password", "Password must be at least 4 characters long").len(4);
//     req
//         .assert("confirmPassword", "Passwords do not match")
//         .equals(req.body.password);
//
//     const errors = req.validationErrors();
//
//     if (errors) {
//         return res.status(400).json({errors: errors});
//     }
//
//     try {
//         const user = await User.query()
//             .allowInsert("[username, password]")
//             .insert({
//                 username: req.body.username,
//                 password: req.body.password
//             });
//     } catch (err) {
//         errorHandler(err, res);
//         return;
//     }
//     passport.authenticate("local", (err, user, info) => {
//         if (err) {
//             return handleResponse(res, 400, {error: err});
//         }
//         if (user) {
//             handleResponse(res, 200, user.getUser());
//         }
//     })(req, res, next);
// };
//
// exports.getWebhook = async(req, res, next) => {
//     passport.authenticate("bearer", (err, user, info) => {
//         if (err) {
//             return handleResponse(res, 401, {error: err});
//         }
//         if (user) {
//             handleResponse(res, 200, user.getHasuraClaims());
//         } else {
//             handleResponse(res, 200, {"X-Hasura-Role": "anonymous"});
//         }
//     })(req, res, next);
// };
//
// function handleResponse(res, code, statusMsg) {
//     res.status(code).json(statusMsg);
// }
