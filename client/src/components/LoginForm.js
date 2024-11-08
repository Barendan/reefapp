import React from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();


    const handleSubmit = async (values, {setSubmitting}) => {
        
        try {
            const response = await axios.post('/api/auth/login', values);
            console.log('Login success:', response.data);

            // Add jwt to localstorage for validation later
            localStorage.setItem('token', response.data.token);

            navigate('/orders')
        } catch (err) {
            console.log('Login error:', err.response.data);
        }

        setSubmitting(false);
    };


    return (
        <Formik 
            initialValues={formData}
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}
        >
            { ({ isSubmitting }) => (
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

                    <button type="submit" disabled={isSubmitting}>Login</button>
                </Form>
            )}

        </Formik>
    );
}


export default LoginForm;