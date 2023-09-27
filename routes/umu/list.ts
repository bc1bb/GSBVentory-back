import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import User from "../../schemas/users";
import UserObject from "../../objs/User";

const listRouter = Router()

listRouter.get('/umu', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const list = await User.find().lean();

    const json: UserObject[] = JSON.parse(JSON.stringify(list));

    res.json(json);
});

export default listRouter;