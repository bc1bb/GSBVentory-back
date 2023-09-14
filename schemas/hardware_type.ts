import mongoose from "mongoose";

// MongoDB schema for hardware type
const hardwareTypeSchema = new mongoose.Schema({
    internalId: {type: String, unique: true, index: true},
    name: String,
});
const HardwareType = mongoose.model('hardwareType', hardwareTypeSchema);

export default HardwareType;