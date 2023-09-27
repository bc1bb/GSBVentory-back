import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import router from './routes';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });
const DB_URL: string = process.env.DB_URL;
const PORT: number = parseInt(process.env.PORT) || 3000;

mongoose.connect(DB_URL).then(r => console.log("Connected to database"));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
