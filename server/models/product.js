const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) { }
  }


  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: false,
  });


  return Product;
};
