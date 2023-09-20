import {Router} from "express";
import healthcheckRouter from "./healthcheck";
import loginRouter from "./login";
import userRouter from "./user";
import hmuRouter from "./hmu";
import umuRouter from "./umu";

const router = Router()

router.use(healthcheckRouter);
router.use(loginRouter);
router.use(userRouter);
router.use(hmuRouter);
router.use(umuRouter);

export default router;