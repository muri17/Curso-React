import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Button, Grid, Link, ListItem, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { AuthContext } from "../context";
import { useContext, useEffect, useState } from 'react';

export const LoginPage = () => {

  const { login, error } = useContext( AuthContext )
  const navigate = useNavigate();
  const [show, setShow] = useState(true)

  const { email, password, onInputChange } = useForm({
    email: 'murua5@hotmail.com',
    password: '123456',
  });

  const onSubmit = async (event) => {
    event.preventDefault();
  
    const lastPath = localStorage.getItem('lastPath') || '/';

    login(email, password)
        
    navigate(lastPath, {
    replace: true
    });
  }

  const limpiarErrores = () => {
    setShow(false)
  }

  useEffect(() => {
    setShow(!show)
  }, [error])

  return (
    <AuthLayout title="Login">
      <form onSubmit={ onSubmit } aria-label='submit-form'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Usuario" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                inputProps={ {
                 'data-testid': 'password'
                }}
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            {error && error.map((item) => (
                  <Grid key={item.msg} item xs={ 12 } sx={{ mt: 2, display: show ? '' : 'none' }}>
                    <Alert severity="error">{item?.msg}</Alert>
                  </Grid>
             ))}
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register" onClick={ limpiarErrores } >
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}