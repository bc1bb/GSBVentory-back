import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import fetchUser from "./fetchUser";

export interface LoggedInRequest extends Request {
    user: object;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const jwt_token = process.env.JWT_TOKEN;

    // Grabs token from header
    // Remove "Bearer " if it's there
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    // Decodes received token using private token
    jwt.verify(token, jwt_token, async (err, decoded: any) => {
        if (err) {
            return res.status(401).json({error: 'Invalid Token'});
        }

        // JWT Payload is stored in decoded (decoded.user = userid)
        // Converting req to LoggedInRequest, so we can add user data to the request
        // Therefore allowing us to send data from this middleware to the actual route that will know who be doing what (what da dog doin)
        (req as LoggedInRequest).user = await fetchUser(decoded.user);

        next();
    });
};

export default authenticate;