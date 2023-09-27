import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareObject from "../../objs/Hardware";
import handleError from "../../funcs/handleError";

const deleteRouter = Router();

deleteRouter.delete('/hmu', authenticate(2), (req: LoggedInRequest, res: Response)  => {
    const {internalId} = req.body as HardwareObject;

    Hardware.findOne({internalId})
        .then((hardware) => {
            if (hardware === null ) res.status(406).json({error: "Invalid internalId"})

            Hardware.collection.findOneAndDelete({internalId}).then(() => {
                res.json({"status": "ok"});
            }, (reason) => { handleError(reason, res); })
        }).catch((reason) => { handleError(reason, res); });
});


export default deleteRouter;