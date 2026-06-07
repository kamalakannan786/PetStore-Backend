const User = require("../Models/UserModel");
const Pet = require("../Models/PetModel");
const Adoption = require("../Models/AdoptionModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true, select: "-password" }
        );
        res.status(200).json({ message: "Role updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error: error.message });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPets = await Pet.countDocuments();
        const availablePets = await Pet.countDocuments({ status: "Available" });
        const totalAdoptions = await Adoption.countDocuments();
        res.status(200).json({ totalUsers, totalPets, availablePets, totalAdoptions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error: error.message });
    }
};

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find().sort({ createdAt: -1 });
        res.status(200).json({ data: pets });
    } catch (error) {
        res.status(500).json({ message: "Error fetching pets", error: error.message });
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

const getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await Adoption.find().sort({ createdAt: -1 });
        res.status(200).json({ data: adoptions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching adoptions", error: error.message });
    }
};

const updateAdoptionStatus = async (req, res) => {
    try {
        const updated = await Adoption.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({ message: "Adoption status updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating adoption", error: error.message });
    }
};

module.exports = {
    getAllUsers, deleteUser, updateUserRole, getDashboardStats,
    getAllPets, deletePet, updatePetStatus,
    getAllAdoptions, updateAdoptionStatus
};
