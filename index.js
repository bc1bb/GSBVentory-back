import express from 'express';
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const jwt_token = process.env.JWT_TOKEN;
const db_url = process.env.DB_URL;
const port = process.env.PORT || 3000;

const app = express();

// Middleware pour le parsing du JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(r => console.log("Connecté à la base de donnée"));

// Modèle d'utilisateur MongoDB
const userSchema = new mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: {type: String},
    userType: {type: Number},
    // 1 pour employé de laboratoire, 2 pour technicien, 3 pour directeur, 4 pour super utilisateur
});
userSchema.index({ username: 1 }, { sparse: true });
const User = mongoose.model('user', userSchema);

// Route de healthcheck
app.get('/healthcheck', (req, res) => {
    res.json({ status: 'OK' });
});

// Endpoint de connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});

    if (!user) {
        return res.status(401).json({ error: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: 401 });
    }

    const token = jwt.sign({ username, userType: user.userType }, jwt_token);

    res.json({ token });
});

// Fonction pour hasher les mots de passes facilement
const hashPassword = async (password) => {
    const hashRounds = 10;

    const salt = await bcrypt.genSalt(hashRounds);

    return await bcrypt.hash(password, salt);
}

// Middleware pour l'authentification
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authentification requise' });
    }

    jwt.verify(token, jwt_token, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token invalide' });
        }

        req.user = decoded;
        next();
    });
};

// Endpoint privé pour les utilisateurs connectés
app.get('/private', authenticate, (req, res) => {
    res.json({ message: 'Bienvenue sur l\'endpoint privé' });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
