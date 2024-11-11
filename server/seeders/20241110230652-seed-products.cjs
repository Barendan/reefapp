const { Product } = require('../models/index.js');

const products = [
  { name: 'Product 1', description: 'Description for product 1', price: 10.99, image_url: 'https://www.img.com' },
  { name: 'Product 2', description: 'Description for product 2', price: 12.99, image_url: 'https://www.img.com' },
  { name: 'Product 3', description: 'Description for product 3', price: 8.49, image_url: 'https://www.img.com' },
  { name: 'Product 4', description: 'Description for product 4', price: 15.00, image_url: 'https://www.img.com' },
  { name: 'Product 5', description: 'Description for product 5', price: 9.99, image_url: 'https://www.img.com' }
];

module.exports = {
  up: async () => {
    try {
      await Product.destroy({ where: {} });

      // Insert new products
      await Product.bulkCreate(products);
      console.log('Products seeded successfully!');
    } catch (err) {
      
      console.error('Error seeding products:', err);
    }
  },

  down: async () => {
    try {
      await Product.destroy({ where: {} });
      
      console.log('Products removed successfully!');
    } catch (err) {

      console.error('Error removing products:', err);
    }
  }
};
