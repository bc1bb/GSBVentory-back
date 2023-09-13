import mongoose from "mongoose";


// Modèle d'utilisateur MongoDB
const userSchema = new mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: {type: String},
    userType: {type: Number},
    // 1 pour employé de laboratoire, 2 pour technicien, 3 pour directeur, 4 pour super utilisateur
});
const User = mongoose.model('user', userSchema);

export default User;