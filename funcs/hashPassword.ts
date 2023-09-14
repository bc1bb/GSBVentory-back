import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
    // Simple function to hash passwords
    const hashRounds = 10;

    const salt = await bcrypt.genSalt(hashRounds);

    return await bcrypt.hash(password, salt);
}

export default hashPassword;