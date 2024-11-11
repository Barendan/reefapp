const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
    }
  }


  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
  });


  return User;
};
