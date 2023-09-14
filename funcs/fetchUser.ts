import User from "../schemas/users";

const fetchUser = async (userId: string) => {
    const user = await User.findById(userId).lean();

    const json = JSON.parse(JSON.stringify(user));

    // don't show password hash
    delete json.password;

    return json;
}

export default fetchUser;