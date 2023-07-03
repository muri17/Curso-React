import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext, LoginPage } from '../../../src/auth';

describe('Pruebas en <LoginPage />', () => {

    const contextValue = {
        logged: false,
        user: {
            email: ''
        },
    }


    test('debe de mostrar el componente correctamente', () => {
        
        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter> 
            </AuthContext.Provider>
        );
        
        expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('submit debe de llamar el login', () => {

        const email = 'murua5@hotmail.com'
        const password = '123456'
        
        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter> 
            </AuthContext.Provider>
        );
        
        const emailField = screen.getByRole('textbox', {name: 'Usuario'})
        fireEvent.change(emailField, { target: {name: email, value: email }})

        const passField = screen.getByTestId('password')
        fireEvent.change(passField, { target: {name: password, value: password }}) 

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.change(loginForm) 
    });
});