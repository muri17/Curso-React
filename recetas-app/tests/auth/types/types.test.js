import { types } from "../../../src/auth";


describe('Pruebas en "Types.js"', () => {
    
    test('debe de regresar estos types', () => {

        expect(types).toEqual({
            login:  '[Auth] Login',
            logout: '[Auth] Logout',
            signup: '[Auth] Signup',
            loginError: '[Auth] Login Error',
            signupError: '[Auth] Signup Error'
        })
        
    });

});