const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
    petId:     { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    petName:   { type: String },
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name:      { type: String, required: true },
    email:     { type: String, required: true },
    phone:     { type: String, required: true },
    message:   { type: String, default: "" },
    status:    { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Adoption", adoptionSchema);
