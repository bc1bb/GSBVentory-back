import authenticate, {LoggedInRequest} from "../funcs/authenticate";
import {Response, Router} from "express";

const userRouter = Router()

// Simple endpoint that returns user for now.

userRouter.get('/user', authenticate(1), async (req: LoggedInRequest, res: Response) => {
    res.json(req.user);
});

export default userRouter;