import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import router from "./routes/index.js";

const db_url = process.env.DB_URL;
const port = process.env.PORT || 3000;

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(r => console.log("Connected to database"));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
