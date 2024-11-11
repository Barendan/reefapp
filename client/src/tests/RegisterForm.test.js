import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm'; 
import axios from '../utils/axios';


jest.mock('../utils/axios', () => ({
    post: jest.fn(),
}));


describe('RegisterForm', () => {
  
    test('renders the registration form', () => {
        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );
        

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });


    test('submits form successfully with valid inputs', async () => {
        axios.post.mockResolvedValueOnce({ data: { message: 'Registration successful!' } });

        render(
            <MemoryRouter>
                <RegisterForm />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Grape Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'grape@fruit.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
        
        fireEvent.click(screen.getByRole('button', { name: /register/i }));


        await waitFor(() => expect(screen.getByText(/registration successful/i)).toBeInTheDocument());
    });


});
