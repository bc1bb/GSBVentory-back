import healthcheckRouter from "./healthcheck.js";
import loginRouter from "./login.js";
import userRouter from "./user.js";
import {Router} from "express";

const router = Router()

router.use(healthcheckRouter);
router.use(loginRouter);
router.use(userRouter);

export default router;