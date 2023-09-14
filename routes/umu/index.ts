import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";
import editRouter from "./edit";

// User Management Unit

const umuRouter = Router();

umuRouter.use(listRouter);
umuRouter.use(addRouter);
umuRouter.use(editRouter)

export default umuRouter;