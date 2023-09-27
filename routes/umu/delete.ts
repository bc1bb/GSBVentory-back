import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import UserObject from "../../objs/User";

const deleteRouter = Router()

deleteRouter.delete('/umu', authenticate(3), async (req: LoggedInRequest, res: Response) => {
    const {username}: UserObject = req.body

    if (await User.findOne({username}) === null) {
        return res.status(406).json({error: "Invalid username"});
    }

    await User.collection.findOneAndDelete({username});

    res.json({"status": "OK"});
});

export default deleteRouter;