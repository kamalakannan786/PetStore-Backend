const Pet = require("../Models/PetModel");
const Adoption = require("../Models/AdoptionModel");

const getAllPets = async (req, res) => {
    try {
        const { category, status } = req.query;
        const filter = {};
        if (category && category !== "All") filter.category = category;
        if (status) filter.status = status;
        const pets = await Pet.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ data: pets });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pets", error: error.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate("sellerId", "firstname lastname email phone");
        if (!pet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ data: pet });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pet", error: error.message });
    }
};

const createPet = async (req, res) => {
    try {
        const { name, category, breed, age, price, description, image, sellerId, sellerName } = req.body;
        const pet = new Pet({ name, category, breed, age, price, description, image, sellerId, sellerName });
        const saved = await pet.save();
        res.status(201).json({ message: "Pet listed successfully", data: saved });
    } catch (error) {
        res.status(400).json({ message: "Error creating pet listing", error: error.message });
    }
};

const updatePetStatus = async (req, res) => {
    try {
        const updated = await Pet.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({ message: "Status updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error: error.message });
    }
};

const deletePet = async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Pet deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting pet", error: error.message });
    }
};

const getMyPets = async (req, res) => {
    try {
        const pets = await Pet.find({ sellerId: req.params.sellerId }).sort({ createdAt: -1 });
        res.status(200).json({ data: pets });
    } catch (error) {
        res.status(500).json({ message: "Error fetching your pets", error: error.message });
    }
};

const submitAdoption = async (req, res) => {
    try {
        const { petId, petName, userId, name, email, phone, message } = req.body;
        const adoption = new Adoption({ petId, petName, userId, name, email, phone, message });
        const saved = await adoption.save();
        res.status(201).json({ message: "Adoption request submitted", data: saved });
    } catch (error) {
        res.status(400).json({ message: "Error submitting adoption request", error: error.message });
    }
};

const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.find().sort({ createdAt: -1 });
        res.status(200).json({ data: adoptions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching adoptions", error: error.message });
    }
};

module.exports = { getAllPets, getPetById, createPet, updatePetStatus, deletePet, getMyPets, submitAdoption, getAllAdoptions };
