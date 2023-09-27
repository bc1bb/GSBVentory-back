import User from "../schemas/users";
import UserObject from "../objs/User";

const fetchUser = async (userId: string): Promise<UserObject> => {
    const user = await User.findById(userId).lean();

    const json: UserObject = JSON.parse(JSON.stringify(user));

    // don't show password hash
    delete json.password;

    return json;
}

export default fetchUser;