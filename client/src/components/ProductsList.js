import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../AppContext';


const ProductList = () => {
    const { products, fetchProducts, deleteProduct } = useContext(AppContext);


    useEffect(() => {
        
        fetchProducts();

    }, []); 


    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    }
    

    return (
        <>
            <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h2>

                <Link
                    to="/products/new"
                    className="inline-block text-blue-500 hover:text-blue-700 mb-4 font-semibold"
                >
                    Create New Product
                </Link>

                <table className="min-w-full table-auto">
                    
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Product ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Product Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Price</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Description</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Image</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-200">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3 text-sm text-gray-700">{product.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{product.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">${product.price}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{product.description}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{product.image_url}</td>
                                
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <Link
                                        to={`/products/edit/${product.id}`}
                                        className="text-blue-500 hover:text-blue-700 mr-4"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        
            <div className="max-w-6xl mx-auto mt-8 text-center">
                <Link
                    to="/orders"
                    className="text-blue-600 text-xl font-semibold underline hover:text-blue-700 transition duration-300"
                >
                    View All Orders
                </Link>
            </div>
        </>
    );
};

export default ProductList;