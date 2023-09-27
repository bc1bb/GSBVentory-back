import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import router from './routes';
import * as dotenv from "dotenv";
import { Logger, ILogObj } from "tslog";
import morgan from "morgan";

dotenv.config({ path: __dirname+'/.env' });

const DB_URL: string = process.env.DB_URL;
const PORT: number = parseInt(process.env.PORT, 10) || 3000;
const log: Logger<ILogObj> = new Logger();

mongoose.connect(DB_URL).then(
    () => { log.info("connected to database"); },
    (reason) => { log.fatal(reason); }
)

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('combined'));

app.use(cors());

app.use(router);

app.listen(PORT, () => {
    log.info(`Server running on port ${PORT}`);
});
