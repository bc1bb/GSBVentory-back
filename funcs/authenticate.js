import jwt from "jsonwebtoken";

const jwt_token = process.env.JWT_TOKEN;

const authenticate = (req, res, next) => {
    // Grabs token from header
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    // Decodes received token using private token
    jwt.verify(token, jwt_token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid Token' });
        }

        req.user = decoded;
        next();
    });
};

export default authenticate;