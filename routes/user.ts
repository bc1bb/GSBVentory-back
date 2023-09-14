import authenticate, {LoggedInRequest} from "../funcs/authenticate";
import {Router} from "express";

const userRouter = Router()

// Simple endpoint that returns user for now.

userRouter.get('/user', authenticate, async (req: LoggedInRequest, res) => {
    res.json(req.user);
});

export default userRouter;