export const generateMockPets = (quantity) => {
  const pets = [];

  for (let i = 0; i < quantity; i++) {
    pets.push({
      name: `Pet${i}`,
      specie: "dog",
      birthDate: new Date(),
      adopted: false
    });
  }

  return pets;
};