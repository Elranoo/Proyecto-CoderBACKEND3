import bcrypt from "bcrypt";

export const generateMockUsers = (quantity) => {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    users.push({
      first_name: `User${i}`,
      last_name: `Test${i}`,
      email: `user${i}@mail.com`,
      password: bcrypt.hashSync("coder123", 10), // contraseña encriptada
      role: Math.random() > 0.5 ? "user" : "admin", // role variable
      pets: [] // array vacío
    });
  }

  return users;
};