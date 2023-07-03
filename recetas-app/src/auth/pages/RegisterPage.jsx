import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Button, Grid, Link, Snackbar, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context";


export const RegisterPage = () => {

  const { signup, error } = useContext( AuthContext )
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true)

  const { email, password, passwordRepeat, onInputChange } = useForm({
    email: '',
    password: '',
    passwordRepeat: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const resp = await signup(email, password)

    if(error.length == 0) {
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

  const limpiarErrores = () => {
    setShow(false)
  }

  useEffect(() => {
    setShow(!show)
  }, [error])

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
                required
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
                required
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
                required
                name="passwordRepeat"
                value={ passwordRepeat }
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
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login" onClick={ limpiarErrores } >
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