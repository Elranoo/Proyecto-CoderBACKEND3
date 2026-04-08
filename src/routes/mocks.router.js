import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";
import { generateMockUsers } from "../mocks/user.mocks.js";
import { generateMockPets } from "../mocks/pet.mocks.js";

const router = Router();


router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(50);
  res.json({ status: "success", payload: pets });
});


router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json({ status: "success", payload: users });
});


router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ status: "error", error: "Parámetros faltantes (users, pets)" });
    }

    const mockUsers = generateMockUsers(Number(users));
    const mockPets = generateMockPets(Number(pets));

    await UserModel.insertMany(mockUsers);
    await PetModel.insertMany(mockPets);

    res.json({
      status: "success",
      message: `Se han generado e insertado ${users} usuarios y ${pets} mascotas.`
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json({ status: "success", payload: users });
});

router.get("/pets", async (req, res) => {
  const pets = await PetModel.find();
  res.json({ status: "success", payload: pets });
});

export default router;