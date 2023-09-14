import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import hashPassword from "../../funcs/hashPassword";

const addRouter = Router()

addRouter.post('/umu', authenticate, async (req: LoggedInRequest, res: Response) => {
    const {username, password, userType} = req.body

    const hashedPassword = await hashPassword(password);
    const userTypeInt = parseInt(userType);

    await User.collection.insertOne({username, hashedPassword, "userType": userTypeInt});

    res.json({"status": "OK"});
});

export default addRouter;