const { Order } = require('../models/index.js');

const orders = [
  { customer_name: 'Mango White', order_date: "2024-11-06 00:00:00", status: 'pending' },
  { customer_name: 'Cherry Brown', order_date: "2024-11-07 00:00:00", status: 'pending' },
  { customer_name: 'Grape Doe', order_date: "2024-11-08 00:00:00", status: 'pending' },
  { customer_name: 'Orange Black', order_date: "2024-11-09 00:00:00", status: 'pending' },
  { customer_name: 'Pineapple Blue', order_date: "2024-11-09 00:00:00", status: 'pending' }
];

module.exports = {
  up: async () => {
    try {
      await Order.destroy({ where: {} });

      // Insert new orders
      await Order.bulkCreate(orders);
      console.log('Orders seeded successfully!');
    } catch (err) {

      console.error('Error seeding orders:', err);
    }
  },

  down: async () => {
    try {
      await Order.destroy({ where: {} });

      console.log('Orders removed successfully!');
    } catch (err) {
      
      console.error('Error removing orders:', err);
    }
  }
};
