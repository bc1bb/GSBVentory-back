import {Router} from "express";

const healthcheckRouter = Router()

healthcheckRouter.get('/healthcheck', (req, res) => {
    res.json({ status: 'OK' });
});

export default healthcheckRouter;