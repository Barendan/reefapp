import React, { useState } from 'react';
import axios from '../utils/axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useNavigate, Link } from 'react-router-dom';



const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});


const RegisterForm = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const formData = {
        name: '',
        email: '',
        password: '',
    }

    const navigate = useNavigate();


    const handleSubmit = async (values, {setSubmitting}) => {

        try {
            await axios.post('/api/auth/register', values);

            setSuccessMessage('Registration successful! Redirecting to login...');

            setTimeout(() => {
                navigate('/')
            }, 2000)
        } catch (err) {
            console.log('Registration error:', err.response.data);
        }

        setSubmitting(false);
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

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
                {({ isSubmitting }) => (
                    <Form className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                Name
                            </label>
                            <Field
                                type="text"
                                name="name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg focus:outline-none transition duration-200"
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>


                        <div className="text-center text-sm text-gray-600 mt-4">
                            <p>
                                Already have an account?{' '}
                                <Link to="/" className="text-blue-500 hover:text-blue-600">
                                    Login here
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


export default RegisterForm;

