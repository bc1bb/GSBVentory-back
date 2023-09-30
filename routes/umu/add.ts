import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import hashPassword from "../../funcs/hashPassword";
import UserObject from "../../objs/User";

const addRouter = Router()

addRouter.post('/umu', authenticate(3), async (req: LoggedInRequest, res: Response) => {
    const {username, password, userType}: UserObject = req.body

    if (username == "") {
        return res.status(406).json({error: "Invalid username"});
    }

    if (await User.findOne({username}) !== null) {
        return res.status(406).json({error: "Invalid username"});
    }

    // front end will send user with no password, in this case we put a default password
    const hashedPassword = (password == undefined) ? await hashPassword("gsb") : await hashPassword(password);

    await User.collection.insertOne({username, "password": hashedPassword, userType});

    res.json({"status": "OK"});
});

export default addRouter;