const express = require("express");
const router = express.Router();
const {
    getAllPets, getPetById, createPet, updatePetStatus,
    deletePet, getMyPets, submitAdoption, getAllAdoptions
} = require("../Controller/PetController");

router.get("/", getAllPets);
router.get("/adoptions", getAllAdoptions);
router.get("/seller/:sellerId", getMyPets);
router.get("/:id", getPetById);
router.post("/", createPet);
router.put("/:id/status", updatePetStatus);
router.delete("/:id", deletePet);
router.post("/adopt", submitAdoption);

module.exports = router;
