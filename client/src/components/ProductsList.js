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
        <div>
            <h2>Product List</h2>
            <Link to="/products/new">Create New Product</Link>

            <table>
                <thead>

                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Image</th>
                    </tr>

                </thead>
                <tbody>
                    {products.map(product => (

                        <tr key={product.id}>

                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.image}</td>
                            <td>
                                <Link to={`/products/edit/${product.id}`}>Edit</Link>
                                
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>

                        </tr>
                        
                    ))}
                </tbody>
            </table>
            
        </div>
    );
};

export default ProductList;