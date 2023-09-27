import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import fetchUser from "./fetchUser";
import CookieObject from "../objs/Cookie";
import UserObject from "../objs/User";

export interface LoggedInRequest extends Request {
    user: UserObject;
}

const authenticate = (minimumUserType: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const JWT_TOKEN = process.env.JWT_TOKEN;

        // Grabs token from header
        // Remove "Bearer " if it's there
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Invalid Token' });
        }

        // Decodes received token using private token
        jwt.verify(token, JWT_TOKEN, async (err, decoded: CookieObject) => {
            if (err) {
                return res.status(401).json({error: 'Invalid Token'});
            }

            // JWT Payload is stored in decoded (decoded.user = userid)
            // Converting req to LoggedInRequest, so we can add user data to the request
            // Therefore allowing us to send data from this middleware to the actual route that will know who be doing what (what da dog doin)
            const user = await fetchUser(decoded.user);
            (req as LoggedInRequest).user = user;

            // Checking if user is allowed to see page
            if (user.userType >= minimumUserType) {
                next();
            } else {
                res.status(403).json({ error: 'Forbidden' });
            }
        });
    }
};

export default authenticate;