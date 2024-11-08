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
        } else {
            createProduct(values);
        }

        
        navigate('/products');
    };


    return (
        <div>
            <h2>{id ? 'Update Product' : 'Create Product'}</h2>

            <Formik
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form>
                    <div>
                        <label>Name</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label>Description</label>
                        <Field type="text" name="description" />
                    </div>
                    <div>
                        <label>Price</label>
                        <Field type="number" name="price" />
                        <ErrorMessage name="price" component="div" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <Field type="url" name="image_url" />
                        <ErrorMessage name="image_url" component="div" />
                    </div>

                    <button type="submit">{id ? 'Update Product' : 'Create Product'}</button>
                </Form>

            </Formik>

        </div>
    );
};

export default ProductForm;


