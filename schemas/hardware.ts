import mongoose from "mongoose";

// MongoDB schema for hardware
const hardwareSchema = new mongoose.Schema({
    type: String, // Corresponds to Hardware_type
    buyDate: Date,
    serialNumber: String,
    manufacturer: String,
    model: String,
    endOfWarrantyDate: Date,
    internalId: {type: String, unique: true, index: true},
    note: String
});
const Hardware = mongoose.model('hardware', hardwareSchema);

export default Hardware;