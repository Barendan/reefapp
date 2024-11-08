import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});


const LoginForm = () => {
    const formData = {
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
                    <label>Email:</label>
                    <Field type="email" name="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label>Password:</label>
                    <Field type="password" name="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Login</button>
            </Form>
        </Formik>
    );
}


export default LoginForm;