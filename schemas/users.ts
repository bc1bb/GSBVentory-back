import mongoose from "mongoose";

// MongoDB schema for users
const userSchema = new mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: {type: String},
    userType: {type: Number},
    // 1 for lab employee, 2 for IT dep, 3 for directors, 4 for root
});
const User = mongoose.model('user', userSchema);

export default User;