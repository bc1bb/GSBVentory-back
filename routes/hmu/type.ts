import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import HardwareType from "../../schemas/hardware_type";
import HardwareTypeObject from "../../objs/HardwareType";
import handleError from "../../funcs/handleError";

const typeRouter = Router();

typeRouter.get('/hmu/type', authenticate(2), (req: LoggedInRequest, res: Response) => {
    HardwareType.find().lean().then(
        (list) => {
            const json = JSON.parse(JSON.stringify(list)) as HardwareTypeObject[];

            res.json(json);
        },
        (reason) => { handleError(reason, res); }
    ).catch((reason) => { handleError(reason, res); });
});

typeRouter.post('/hmu/type', authenticate(2), (req: LoggedInRequest, res: Response) => {
    const {name, internalId} = req.body as HardwareTypeObject;

    // Check that name is not already in use
    HardwareType.findOne({name}).then(
        (HardwareTypeAsDocument) => {
            if (HardwareTypeAsDocument !== null) {
                res.status(406).json({error: "Invalid name"});
            }
        },
        (reason) => { handleError(reason, res); }
    );

    HardwareType.collection.insertOne({name, internalId}).then(
        () => {
            res.json({"status": "OK"});
        },
        (reason) => {
            handleError(reason, res);
        }
    ).catch((reason) => { handleError(reason, res); });
});

typeRouter.delete('/hmu/type', authenticate(2), (req: LoggedInRequest, res: Response) => {
    const {name} = req.body as HardwareTypeObject;

    HardwareType.findOne({name}).then(
        (HardwareTypeAsDocument) => {
            if (HardwareTypeAsDocument === null) {
                res.status(406).json({error: "Invalid name"});
            }
        },
        (reason) => { handleError(reason, res); },
    ).catch((reason) => { handleError(reason, res); })

    HardwareType.collection.findOneAndDelete({name}).then(
        () => {
            res.json({"status": "OK"});
        },
        (reason) => { handleError(reason, res); }
    ).catch((reason) => { handleError(reason, res); });
});

export default typeRouter;