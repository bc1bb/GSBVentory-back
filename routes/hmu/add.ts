import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareType from "../../schemas/hardware_type";

const addRouter = Router()

addRouter.post('/hmu', authenticate, async (req: LoggedInRequest, res: Response) => {
    const {type, buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note} = req.body

    // Input checking type
    const types = await HardwareType.find().lean();
    let typesArray: Array<string> = [];
    JSON.parse(JSON.stringify(types)).forEach((i: any) => { typesArray.push(i.name); });

    if (!typesArray.includes(type)) {
        return res.status(406).json({error: "Invalid Type"});
    }

    const typeAsDocument = await HardwareType.findOne({ "name": type });

    const internalBuyDate = new Date(buyDate);
    let internalId = internalBuyDate.getFullYear() + (internalBuyDate.getMonth() + 1).toString().padStart(2, "0") + "0001"
    let working = true;

    // very ugly hack to find an available Internal ID
    while (working) {
        const tempInternalId = typeAsDocument.internalId + internalId;

        if (await Hardware.findOne({"internalId": tempInternalId}) === null) {
            working = false;
            break
        }

        internalId = (parseInt(internalId)+1).toString();
    }

    const finalInternalId = (typeAsDocument.internalId + internalId);

    await Hardware.collection.insertOne({type, "buyDate": new Date(buyDate), serialNumber, manufacturer, model, "endOfWarrantyDate": new Date(endOfWarrantyDate), "internalId": finalInternalId, note});

    res.json({"internalId": finalInternalId});
});

export default addRouter;