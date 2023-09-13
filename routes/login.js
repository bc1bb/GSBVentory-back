import User from "../schemas/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Router} from "express";

const jwt_token = process.env.JWT_TOKEN;

const loginRouter = Router()

// Endpoint de connexion
loginRouter.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(401).json({error: 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({error: 401});
    }

    const token = jwt.sign({username, userType: user.userType}, jwt_token);

    res.header("Authorization", token);
    res.json({token});
});

export default loginRouter;