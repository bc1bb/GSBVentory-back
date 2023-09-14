import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";

// Hardware Management Unit

const hmuRouter = Router();

hmuRouter.use(listRouter);
hmuRouter.use(addRouter);

export default hmuRouter;