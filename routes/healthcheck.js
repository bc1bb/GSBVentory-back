import {Router} from "express";

const healthcheckRouter = Router()

// Endpoint de healthcheck
healthcheckRouter.get('/healthcheck', (req, res) => {
    res.json({ status: 'OK' });
});

export default healthcheckRouter;