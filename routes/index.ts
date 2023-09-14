import healthcheckRouter from "./healthcheck";
import loginRouter from "./login";
import userRouter from "./user";
import {Router} from "express";

const router = Router()

router.use(healthcheckRouter);
router.use(loginRouter);
router.use(userRouter);

export default router;