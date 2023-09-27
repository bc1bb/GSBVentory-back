import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareObject from "../../objs/Hardware";
import handleError from "../../funcs/handleError";

const listRouter = Router();

listRouter.get('/hmu', authenticate(2), (req: LoggedInRequest, res: Response) => {
    Hardware.find().lean().then(
        (list) => {
            const json = JSON.parse(JSON.stringify(list)) as HardwareObject[];

            res.json(json);
        },
        (reason) => { handleError(reason, res); }
    ).catch((reason) => { handleError(reason, res); }
    );
});

export default listRouter;