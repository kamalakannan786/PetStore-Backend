const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    category:    { type: String, required: true },
    breed:       { type: String, required: true },
    age:         { type: String, required: true },
    price:       { type: Number, required: true },
    description: { type: String, required: true },
    image:       { type: String, default: "" },
    status:      { type: String, default: "Available" },
    sellerId:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sellerName:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Pet", petSchema);
