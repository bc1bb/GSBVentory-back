import authenticate from "../funcs/authenticate.js";
import {Router} from "express";

const userRouter = Router()

userRouter.get('/user', authenticate, async (req, res) => {
    res.json({ "username": req.user.username, "userType": req.user.userType });
});

export default userRouter;