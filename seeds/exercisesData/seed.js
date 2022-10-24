const sequelize = require("../../config/connection");
const ExercisesData = require("../../models/ExercisesData");

const exercisesData = require("./exercisesData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await ExercisesData.bulkCreate(exercisesData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
