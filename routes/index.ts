import healthcheckRouter from "./healthcheck";
import loginRouter from "./login";
import userRouter from "./user";
import {Router} from "express";
import hmuRouter from "./hmu";

const router = Router()

router.use(healthcheckRouter);
router.use(loginRouter);
router.use(userRouter);
router.use(hmuRouter);

export default router;