import {Response, Router} from "express";
import authenticate, {LoggedInRequest} from "../../funcs/authenticate";
import Hardware from "../../schemas/hardware";
import HardwareType from "../../schemas/hardware_type";
import HardwareObject from "../../objs/Hardware";
import handleError from "../../funcs/handleError";

const addRouter = Router();

addRouter.post('/hmu', authenticate(2), (req: LoggedInRequest, res: Response) => {
    const {type, buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note} = req.body as HardwareObject;

    // Input checking type
    HardwareType.findOne({name:type}).then(
        async (HardwareTypeAsDocument) => {
            const internalBuyDate = new Date(buyDate);
            let internalId = internalBuyDate.getFullYear() + (internalBuyDate.getMonth() + 1).toString().padStart(2, "0") + "0001"
            let working = true;

            // very ugly hack to find an available Internal ID
            while (working) {
                const tempInternalId = HardwareTypeAsDocument.internalId + internalId;

                if (await Hardware.findOne({"internalId": tempInternalId}) === null) {
                    working = false;
                    break
                }

                internalId = (parseInt(internalId, 10)+1).toString();
            }

            const finalInternalId = (HardwareTypeAsDocument.internalId + internalId);

            await Hardware.collection.insertOne({type, "buyDate": new Date(buyDate), serialNumber, manufacturer, model, "endOfWarrantyDate": new Date(endOfWarrantyDate), "internalId": finalInternalId, note});

            res.json({"internalId": finalInternalId});
        },
        (reason) => { handleError(reason, res); }
    );
});

export default addRouter;