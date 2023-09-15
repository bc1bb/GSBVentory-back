import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";

const listRouter = Router()

listRouter.get('/hmu', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const list = await Hardware.find().lean();

    const json = JSON.parse(JSON.stringify(list));

    res.json(json);
});

export default listRouter;