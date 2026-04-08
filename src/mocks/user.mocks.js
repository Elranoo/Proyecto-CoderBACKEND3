import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const generateMockUsers = (quantity) => {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: `User${i}`,
      last_name: `Test${i}`,
      email: `user${i}@mail.com`,
      password: bcrypt.hashSync("coder123", 10),
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: []
    });
  }

  return users;
};