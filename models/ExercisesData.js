const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ExercisesData extends Model {}

ExercisesData.init(
  {
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    muscle_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rest_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "exercisesData",
  }
);

module.exports = ExercisesData;
