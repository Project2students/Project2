const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class CustomWorkout extends Model {}

CustomWorkout.init(
  {
    workout_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_calories: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "customWorkout",
  }
);

module.exports = CustomWorkout;
