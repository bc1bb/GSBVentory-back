import authenticate, {LoggedInRequest} from "../funcs/authenticate";
import {Router} from "express";

const userRouter = Router()

userRouter.get('/user', authenticate, async (req: LoggedInRequest, res) => {
    res.json({ "user": req.token.user });
});

export default userRouter;