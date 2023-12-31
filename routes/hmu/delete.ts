import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareObject from "../../objs/Hardware";

const deleteRouter = Router()

deleteRouter.delete('/hmu', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const {internalId}: HardwareObject = req.body

    if (await Hardware.findOne({internalId}) === null) {
        return res.status(406).json({error: "Invalid internalId"});
    }

    await Hardware.collection.findOneAndDelete({internalId});

    res.json({"status": "OK"});
});

export default deleteRouter;