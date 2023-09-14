import User from "../schemas/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {Router} from "express";

const jwt_token = process.env.JWT_TOKEN;

const loginRouter = Router()

loginRouter.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(401).json({error: 401});
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({error: 401});
    }

    // Sign username and userType, we won't need more, using private token
    const token: string = jwt.sign({"user": user._id}, jwt_token);

    res.json({token});
});

export default loginRouter;