import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';

import User from "./schemas/users.js";

import loginRouter from "./routes/login.js";
import healthcheckRouter from "./routes/healthcheck.js";

import authenticate from "./funcs/authenticate.js";

const db_url = process.env.DB_URL;
const port = process.env.PORT || 3000;

// Connexion à la base de données MongoDB
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(r => console.log("Connecté à la base de donnée"));

const app = express();

// Middleware pour le parsing du JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(loginRouter);
app.use(healthcheckRouter);

// Endpoint privé pour les utilisateurs connectés
app.get('/user', authenticate, async (req, res) => {
    const user = await User.findOne({"username": req.username});

    res.json({ "username": user.username, "userType": user.userType });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
