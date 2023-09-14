import {Request, Response, Router} from "express";

const healthcheckRouter = Router()

healthcheckRouter.get('/healthcheck', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
});

export default healthcheckRouter;