const { Product } = require('../../models');




// fetch all products
const fetchProducts = async () => {
    return await Product.findAll();
};


// fetch product
const fetchProductById = async (id) => {
    return await Product.findOne({ where: { id } });
};


// add new product
const createProduct = async (productData) => {
    const newProduct = await Product.create(productData);

    return newProduct;
};


// update product
const updateProduct = async (id, productData) => {
    const product = await Product.findOne({ where: { id } });

    if (!product) throw new Error('Product not found');
    
    await product.update(productData);
    
    return product;
};


// remove product
const removeProduct = async (id) => {
    const deleteResult = await Product.destroy({ where: { id } });

    return deleteResult > 0;
};



module.exports = { fetchProducts, fetchProductById, createProduct, updateProduct, removeProduct };
