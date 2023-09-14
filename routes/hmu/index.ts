import {Router} from "express";
import listRouter from "./list";
import addRouter from "./add";
import editRouter from "./edit";
import deleteRouter from "./delete";
import typeRouter from "./type";

// Hardware Management Unit

const hmuRouter = Router();

hmuRouter.use(listRouter);
hmuRouter.use(addRouter);
hmuRouter.use(editRouter);
hmuRouter.use(deleteRouter);
hmuRouter.use(typeRouter);

export default hmuRouter;