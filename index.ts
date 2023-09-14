import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import router from './routes/index';

const db_url: string = process.env.DB_URL;
const port: number = parseInt(process.env.PORT) || 3000;

mongoose.connect(db_url).then(r => console.log("Connected to database"));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
