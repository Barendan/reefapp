import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AppContext } from '../../context/AppContext';


const validationSchema = Yup.object({
    customer_name: Yup.string().required('Customer name is required'),
    status: Yup.string().oneOf(['Pending', 'Shipped', 'Delivered'], 'Invalid status').required('Order status is required')
});


const OrderForm = () => {
    const { orders, createOrder, updateOrder } = useContext(AppContext); 

    const { id } = useParams();
    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        customer_name: '',
        status: '',
        order_date: '', // non-editable
        id: ''  // non-editable
    });


    useEffect(() => {

        if (id) {
            const order = orders.find(o => o.id === id);
            
            if (order) {
                setFormData({
                    id: order.id,
                    customer_name: order.customer_name,
                    status: order.status,
                    order_date: order.order_date
                });
            }

        }

    }, [id, orders]);

    

    const onSubmit = (values) => {

        if (id) {
            updateOrder(id, values);
        } else {
            createOrder(values);
        }


        navigate('/orders');
    };


    return (
        <>
            <h2>{id ? 'Update Order' : 'Create Order'}</h2>

            <Formik
                enableReinitialize            
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                <Form>
                    <div>
                        <label>Order ID</label>
                        <Field type="text" name="id" readOnly />
                    </div>
                    <div>
                        <label>Order Date</label>
                        <Field type="text" 
                            name="order_date"
                            value={new Date(initialValues.order_date).toLocaleDateString()}
                            readOnly 
                        />
                    </div>
                    <div>
                        <label>Customer Name</label>
                        <Field type="text" name="customer_name" />
                        <ErrorMessage name="customer_name" component="div" />
                    </div>
                    <div>
                        <label>Order Status</label>
                        <Field as="select" name="status">
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </Field>
                        <ErrorMessage name="status" component="div" />
                    </div>
                    <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
                </Form>

            </Formik>
        </>
    );
};

export default OrderForm;

