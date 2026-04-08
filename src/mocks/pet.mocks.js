import mongoose from "mongoose";

export const generateMockPets = (quantity) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      _id: new mongoose.Types.ObjectId(),
      name: `Pet${i}`,
      specie: "dog",
      birthDate: new Date(),
      adopted: false
    });
  }

  return pets;
};