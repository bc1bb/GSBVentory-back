import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";
import editRouter from "./edit";
import deleteRouter from "./delete";

// Hardware Management Unit

const hmuRouter = Router();

hmuRouter.use(listRouter);
hmuRouter.use(addRouter);
hmuRouter.use(editRouter)
hmuRouter.use(deleteRouter)

export default hmuRouter;