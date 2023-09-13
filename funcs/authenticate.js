import jwt from "jsonwebtoken";

const jwt_token = process.env.JWT_TOKEN;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authentification requise' });
    }

    jwt.verify(token, jwt_token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        req.user = decoded;
        next();
    });
};

export default authenticate;