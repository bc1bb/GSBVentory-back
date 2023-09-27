import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import hashPassword from "../../funcs/hashPassword";
import UserObject from "../../objs/User";

const editRouter = Router()

editRouter.patch('/umu', authenticate(3), async (req: LoggedInRequest, res: Response) => {
    const {username, userType}: UserObject = req.body

    if (await User.findOne({username}) === null) {
        return res.status(406).json({error: "Invalid username"});
    }

    await User.collection.findOneAndUpdate({username}, {$set:{username, userType}});

    res.json({"status": "OK"});
});

editRouter.patch('/umu/password', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const {username, password}: UserObject = req.body

    if (await User.findOne({username}) === null) {
        return res.status(406).json({error: "Invalid username"});
    }

    const hashedPassword = await hashPassword(password);

    await User.collection.findOneAndUpdate({username}, {$set:{username, "password": hashedPassword}});

    res.json({"status": "OK"});
});

export default editRouter;