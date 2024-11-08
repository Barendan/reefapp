import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
});


const LoginForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
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

            setSuccessMessage('Login successful! Redirecting to Orders...');

            setTimeout(() => {
                navigate('/orders')
            }, 2000)
        } catch (err) {
            console.log('Login error:', err.response.data);
        }

        setSubmitting(false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

                {successMessage && (
                    <div className="bg-green-500 text-white py-2 px-4 mb-6 rounded-md">
                        {successMessage}
                    </div>
                )}
                

                <Formik 
                    initialValues={formData}
                    validationSchema={validationSchema} 
                    onSubmit={handleSubmit}
                >
                    { ({ isSubmitting }) => (
                        <Form className="max-w-md mx-auto p-6 bg-white shadow-md rounded">

                            <div className="mb-4">
                                <label className="block text-gray-700">Email:</label>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage 
                                    name="email" 
                                    component="div" 
                                    className="text-red-500 text-sm"
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700">Password:</label>
                                <Field 
                                    type="password" 
                                    name="password" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage 
                                    name="password" 
                                    component="div" 
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 text-white font-bold py-2 rounded focus:outline-none hover:bg-blue-600"
                            >
                                Login
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-blue-500 hover:text-blue-600">
                                        Register here
                                    </Link>
                                </p>
                            </div>

                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    );
}


export default LoginForm;