import bcrypt from "bcrypt";

// Fonction pour hasher les mots de passes facilement
const hashPassword = async (password) => {
    const hashRounds = 10;

    const salt = await bcrypt.genSalt(hashRounds);

    return await bcrypt.hash(password, salt);
}

export default hashPassword;