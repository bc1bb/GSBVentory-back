import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import hashPassword from "../../funcs/hashPassword";

const editRouter = Router()

editRouter.patch('/umu', authenticate, async (req: LoggedInRequest, res: Response) => {
    const {username, userType} = req.body

    if (await User.findOne({username}) === null) {
        return res.status(406).json({error: "Invalid username"});
    }

    const userTypeInt = parseInt(userType);

    await User.collection.findOneAndUpdate({username}, {$set:{username, "userType": userTypeInt}});

    res.json({"status": "OK"});
});

editRouter.patch('/umu/password', authenticate, async (req: LoggedInRequest, res: Response) => {
    const {username, password} = req.body

    if (await User.findOne({username}) === null) {
        return res.status(406).json({error: "Invalid username"});
    }

    const hashedPassword = await hashPassword(password);

    await User.collection.findOneAndUpdate({username}, {$set:{username, "password": hashedPassword}});

    res.json({"status": "OK"});
});

export default editRouter;