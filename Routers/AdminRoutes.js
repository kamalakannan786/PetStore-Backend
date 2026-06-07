const express = require("express");
const router = express.Router();
const {
    getAllUsers, deleteUser, updateUserRole, getDashboardStats,
    getAllPets, deletePet, updatePetStatus,
    getAllAdoptions, updateAdoptionStatus
} = require("../Controller/AdminController");

router.get("/dashboard", getDashboardStats);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", updateUserRole);

router.get("/pets", getAllPets);
router.delete("/pets/:id", deletePet);
router.put("/pets/:id/status", updatePetStatus);

router.get("/adoptions", getAllAdoptions);
router.put("/adoptions/:id/status", updateAdoptionStatus);

module.exports = router;
