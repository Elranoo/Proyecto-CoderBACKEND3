import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";
import { generateMockUsers } from "../mocks/user.mock.js";
import { generateMockPets } from "../mocks/pet.mock.js";

const router = Router();




router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);
  res.json({
    status: "success",
    payload: pets
  });
});




router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json({
    status: "success",
    payload: users
  });
});




router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    const mockUsers = generateMockUsers(Number(users));
    const mockPets = generateMockPets(Number(pets));

    await UserModel.insertMany(mockUsers);
    await PetModel.insertMany(mockPets);

    res.json({
      status: "success",
      message: "Datos generados e insertados correctamente"
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

export default router;