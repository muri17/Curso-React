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

  const login = async (email, password) => {

    let action
    let errores = []
    const resp = await loginApi(email, password)

    if (resp.status != 200) {
      if (resp.response.data.error == undefined) {
        errores = resp.response.data.errors
      } else {
        errores.push({msg: resp.response.data.error.message})
      }
      action = { 
        type: types.loginError,
        payload: errores };
    } else {
      const user = resp.data
      localStorage.setItem('user', JSON.stringify( user ) );
      localStorage.setItem('idToken', JSON.stringify( user.idToken ) );
      action = { 
        type: types.login, 
        payload: user 
      }
    }
 

    dispatch(action);
  }

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('idToken');
    const action = { type: types.logout };
    dispatch(action);
  }

  const signup = async (email, password) => {
    let action
    let errores = []
    const resp = await signupApi(email, password)

    if (resp.status != 200) {
      if (resp.response.data.error == undefined) {
        errores = resp.response.data.errors
      } else {
        errores.push({msg: resp.response.data.error.message})
      }
      action = { 
        type: types.signupError,
        payload: errores };
    } else {
      action = { 
        type: types.signup };
    }
    dispatch(action);
  }

  const favorites = () => {
    const action = { 
      type: types.favorite,
      payload: [] };
    dispatch(action);
  }


  return (
    <AuthContext.Provider value={{
      ...authState,

      // Methods
      login,
      logout,
      signup,
      favorites
    }}>
        { children }
    </AuthContext.Provider>
  );
}
