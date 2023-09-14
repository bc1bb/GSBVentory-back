import jwt, {JwtPayload} from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";

export interface LoggedInRequest extends Request {
    token: JwtPayload;
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
    jwt.verify(token, jwt_token, (err, decoded: any) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid Token' });
        }

        // JWT Payload is stored in decoded
        // Converting req to LoggedInRequest, so we can add jwt payload to the request
        // Therefore allowing us to send data from this middleware to the actual route that will know who be doing what (what da dog doin)
        (req as LoggedInRequest).token = decoded;
        next();
    });
};

export default authenticate;