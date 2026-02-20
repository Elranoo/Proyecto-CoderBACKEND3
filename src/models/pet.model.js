import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
  birthDate: Date,
  adopted: Boolean
});

export const PetModel = mongoose.model("pets", petSchema);