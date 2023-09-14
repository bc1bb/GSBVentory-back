import {Router} from "express";
import listRouter from "./list";

// Hardware Management Unit

const hmuRouter = Router();

hmuRouter.use(listRouter);

export default hmuRouter;