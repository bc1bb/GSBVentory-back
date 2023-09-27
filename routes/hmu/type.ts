import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import HardwareType from "../../schemas/hardware_type";
import HardwareTypeObject from "../../objs/HardwareType";

const typeRouter = Router()

typeRouter.get('/hmu/type', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const list = await HardwareType.find().lean();

    const json: HardwareTypeObject[] = JSON.parse(JSON.stringify(list));

    res.json(json);
});

typeRouter.post('/hmu/type', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const {name, internalId}: HardwareTypeObject = req.body

    if (await HardwareType.findOne({name}) !== null) {
        return res.status(406).json({error: "Invalid name"});
    }

    await HardwareType.collection.insertOne({name, internalId});

    res.json({"status": "OK"});
});

typeRouter.delete('/hmu/type', authenticate(2), async (req: LoggedInRequest, res: Response) => {
    const {name}: HardwareTypeObject = req.body

    if (await HardwareType.findOne({name}) === null) {
        return res.status(406).json({error: "Invalid name"});
    }

    await HardwareType.collection.findOneAndDelete({name});

    res.json({"status": "OK"});
});

export default typeRouter;