import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../src/auth';
import { NavBar } from '../../../src/recetas/components/NavBar';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));


describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            email: 'murua5@hotmail.com'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks() );


    test('debe de mostrar el nombre del usuario', () => {
        
        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter> 
            </AuthContext.Provider>
        );
        
        expect( screen.getByText('murua5@hotmail.com') ).toBeTruthy();
        

    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {

        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByText('Cerrar sesion');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled()
        expect( mockedUseNavigate ).toHaveBeenCalledWith('auth/login', {"replace": true})


    });

    
});


