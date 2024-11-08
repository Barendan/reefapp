import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AppContext } from '../AppContext';


const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().required('Product price is required').positive(),
    image_url: Yup.string().url('Invalid URL')
});


const ProductForm = () => {
    const { products, createProduct, updateProduct } = useContext(AppContext);
    
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: ''
    });


    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        if (id) {
            const product = products.find(p => p.id === parseInt(id));
            
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image_url: product.image_url
                });
            }

        }

    }, [id, products]);


    const onSubmit = (values) => {

        if (id) {
            updateProduct(id, values);
            setSuccessMessage('Product Updated! Redirecting to Products...');
        } else {
            createProduct(values);
            setSuccessMessage('Product Created! Redirecting to Products...');
        }


        setTimeout(() => {
            navigate('/products');
        }, 2000)
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{id ? 'Update Product' : 'Create Product'}</h2>

            {successMessage && (
                <div className="bg-green-500 text-white py-2 px-4 mb-6 rounded-md">
                    {successMessage}
                </div>
            )}


            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-medium text-gray-700 mb-2">Name</label>
                        <Field 
                            id="name"
                            type="text" 
                            name="name" 
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-medium text-gray-700 mb-2">Description</label>
                        <Field 
                            id="description"
                            type="text" 
                            name="description" 
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-medium text-gray-700 mb-2">Price</label>
                        <Field 
                            id="price"
                            type="number" 
                            name="price" 
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="image_url" className="font-medium text-gray-700 mb-2">Image URL</label>
                        <Field 
                            id="image_url"
                            type="url" 
                            name="image_url" 
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="image_url" component="div" className="text-red-500 text-sm" />
                    </div>


                    <button 
                        type="submit" 
                        className="w-full py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {id ? 'Update Product' : 'Create Product'}
                    </button>

                </Form>

            </Formik>

        </div>
    );
};

export default ProductForm;


