const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserPictures extends Model {}

UserPictures.init(
  {
    picture_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      timestamps: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "userpictures",
  }
);

module.exports = UserPictures;
