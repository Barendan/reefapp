import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});


const RegisterForm = () => {
    const formData = {
        name: '',
        email: '',
        password: '',
    }


    const handleSubmit = () => {
        console.log('submit clicked')
    };


    return (
        <Formik 
            initialValues={formData}
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
        >
            
            <Form>
                <div>
                    <label>Name:</label>
                    <Field type="text" name="name" />
                    <ErrorMessage name="name" component="div" />
                </div>
                <div>
                    <label>Email:</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label>Password:</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                
                <button type="submit">Register</button>
            </Form>

        </Formik>
    );

}


export default RegisterForm;

