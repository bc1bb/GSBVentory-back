import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";
import editRouter from "./edit";
import deleteRouter from "./delete";

// User Management Unit

const umuRouter = Router();

umuRouter.use(listRouter);
umuRouter.use(addRouter);
umuRouter.use(editRouter);
umuRouter.use(deleteRouter);

export default umuRouter;