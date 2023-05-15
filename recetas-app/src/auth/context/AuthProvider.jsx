import { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { login as loginApi, signup as signupApi } from '../../api/authApi';

import { types } from '../types/types';

// const initialState = {
//     logged: false,
// }

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user: user,
  }
}

export const AuthProvider = ({ children }) => {
    
  const [ authState, dispatch ] = useReducer( authReducer, {}, init );

  const login = async ( email, password ) => {

    const resp = await loginApi(email, password)
    const user = resp
    const action = { 
      type: types.login, 
      payload: user 
    }

    localStorage.setItem('user', JSON.stringify( user ) );
    localStorage.setItem('idToken', JSON.stringify( user.idToken ) );

    dispatch(action);
  }

  const logout = () => {
    localStorage.removeItem('user');
    const action = { type: types.logout };
    dispatch(action);
  }

  const signup = async (email, password) => {
    const resp = await signupApi(email, password)
    const action = { type: types.signup };
    dispatch(action);
  }


  return (
    <AuthContext.Provider value={{
      ...authState,

      // Methods
      login,
      logout,
      signup,
    }}>
        { children }
    </AuthContext.Provider>
  );
}
