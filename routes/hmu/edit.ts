import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareObject from "../../objs/Hardware";
import { Logger, ILogObj } from "tslog";

const log: Logger<ILogObj> = new Logger();
const editRouter = Router();

editRouter.patch('/hmu', authenticate(2), (req: LoggedInRequest, res: Response) => {
    const {internalId, buyDate, serialNumber,
        manufacturer, model, endOfWarrantyDate,
        note} = req.body as HardwareObject;

    Hardware.findOne({internalId}).then(
        (HardwareAsDocument) => {
            if (HardwareAsDocument === null) {
                res.status(406).json({error: "Invalid internalId"});
            }

            Hardware.collection.findOneAndUpdate({internalId}, {$set:{"buyDate": new Date(buyDate), serialNumber, manufacturer, model, "endOfWarrantyDate": new Date(endOfWarrantyDate), note}}).then(
                () => {res.json({status: "OK"});},
                (reason) => {
                    log.error(reason);
                    res.status(500).json({error: "Server-Side Error"});
                }
            );
        },
        (reason) => {
            log.error(reason);
            res.status(500).json({error: "Server-Side Error"});
        }
    ).catch((reason) => {
        log.error(reason);
        res.status(500).json({error: "Server-Side Error"});
    });
});

export default editRouter;