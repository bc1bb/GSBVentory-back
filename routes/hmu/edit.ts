import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";

const editRouter = Router()

editRouter.patch('/hmu', authenticate, async (req: LoggedInRequest, res: Response) => {
    const {internalId, type, buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note} = req.body

    if (await Hardware.findOne({internalId}) === null) {
        return res.status(406).json({error: "Invalid internalId"});
    }

    await Hardware.collection.findOneAndUpdate({internalId}, {$set:{"buyDate": new Date(buyDate), serialNumber, manufacturer, model, "endOfWarrantyDate": new Date(endOfWarrantyDate), note}});

    res.json({"status": "OK"});
});

export default editRouter;