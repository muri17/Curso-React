import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useContext, useState } from 'react';
import { AuthContext } from "../context";


export const RegisterPage = () => {

  const { signup } = useContext( AuthContext )
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { email, password, passwordRepeat, onInputChange } = useForm({
    email: '',
    password: '',
    passwordRepeat: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();

    const resp = signup(email, password)

    if(resp.status == 200) {
      handleClick()

      navigate('auth/login', {
        replace: true
      });
    }
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={ onSubmit }>
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
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Repetir Contraseña" 
                type="password" 
                placeholder='Repetir Contraseña' 
                fullWidth
                name="passwordRepeat"
                value={ passwordRepeat }
                onChange={ onInputChange }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button type='submit' variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
              Cuenta creada con éxito!
            </Alert>
          </Snackbar>
    
        </form>
    </AuthLayout>
  )
}