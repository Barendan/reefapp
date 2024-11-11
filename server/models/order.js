const { Model, DataTypes } = require('sequelize');



module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
    }
  }
  
  Order.init({
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: false,
  });


  return Order;
};
