import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";
import editRouter from "./edit";

// Hardware Management Unit

const hmuRouter = Router();

hmuRouter.use(listRouter);
hmuRouter.use(addRouter);
hmuRouter.use(editRouter)

export default hmuRouter;