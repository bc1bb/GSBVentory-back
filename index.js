import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import User from "./schemas/index.js";

import {loginRouter, healthcheckRouter} from "./routes/index.js";

import authenticate from "./funcs/authenticate.js";

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

app.use(loginRouter);
app.use(healthcheckRouter);

app.get('/user', authenticate, async (req, res) => {
    res.json({ "logged": "ok" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
