import { types } from '../types/types';

const INITIAL_STATE = {logged: false, user: '', error: ''}
export const authReducer = ( state = INITIAL_STATE, action ) => {


    switch ( action.type ) {

        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            };

        case types.logout:
            return {
                logged: false,
            };

        case types.signup:
            return {
                logged: false,
            };
        
        case types.loginError:
            return {
                logged: false,
                error: action.payload
            };

        case types.signupError:
            return {
                logged: false,
                error: action.payload
            };
        
        case types.favorite:
            return {
                logged: true,
                error: action.payload
            };
    
        default:
            return state;
    }

}