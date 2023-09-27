import { Logger, ILogObj } from "tslog";
import {Response} from "express";

const log: Logger<ILogObj> = new Logger();

const handleError = (error: any, res: Response) => {
    log.error(error);
    res.status(500).json({error: "Server-Side Error"});
}

export default handleError;