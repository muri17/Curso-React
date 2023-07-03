import { Alert, Button, Grid, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Snackbar, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks";
import { Add, Cancel, CheckCircle, Circle, Close, Delete, HorizontalRule, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { RecetasLayout } from "../layout/RecetasLayout";
import { agregarReceta, editarReceta } from "../../api/recipesApi";
import { useEffect, useState } from "react";

export const AbmRecetaPage = () => {

    const recetaSelected = JSON.parse(localStorage.getItem('recetaSelected'));
    const navigate = useNavigate();
    const [ ingredientes = [{'name': ''}] , setingredientes ] = useState([])
    const [ inputValue, setInputValue ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ error = [], setError ] = useState([]);
    
    useEffect(() => {
        if(recetaSelected) {
            setFormState({
                nombre: recetaSelected.name,
                descripcion: recetaSelected.description,
                url: recetaSelected.imagePath,
            })
            setingredientes(recetaSelected.ingredients)
        }
      }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        const resp = await agregarReceta(nombre, descripcion, ingredientes, url)
        if (resp?.msg) {
            handleClick()
            onResetForm()
            setingredientes([])
            setError([])
        } else {
            let errores = []
            if (resp.response.data.error == undefined) {
                errores = resp.response.data.errors
              } else {
                errores.push({msg: resp.response.data.error.message})
              }
            setError(errores)
        }
    
    }

    const onClickGuardar = async () => {
        const resp = await editarReceta(nombre, descripcion, ingredientes, url, recetaSelected._id, recetaSelected.userEmail, recetaSelected.__v)
        if (resp?.msg) {
            handleClick()
            setError([])
        } else {
            let errores = []
            if (resp.response.data.error == undefined) {
                errores = resp.response.data.errors
              } else {
                errores.push({msg: resp.response.data.error.message})
              }
            setError(errores)
        }
    }

    const onClickCancelar = () => {
        navigate('/recetas');
        localStorage.removeItem('recetaSelected');
    } 

    const onClickAgregar = () => {
        setingredientes([...ingredientes, {'name': inputValue} ])
        setInputValue('')
    }
    
    const onClickEliminar = (ingre) => {
        const ingredientesFiltrados = ingredientes.filter(item => item !== ingre);
        setingredientes(ingredientesFiltrados)
    }

    const onInputChangeIn = ({ target }) => {
        setInputValue( target.value );
    }

    const onInputChangeInClean = () => {
        setInputValue( '' );
    }

    const handleClick = () => {
        setOpen(true);
    }
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    
    setOpen(false);
    };

    const { nombre, descripcion, url, onInputChange, onResetForm, setFormState, onInputClean } = useForm({
        nombre: '',
        descripcion: '',
        url: '',
      });

  return (
    <RecetasLayout>
        <Grid container  spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center" sx={{ mb: 2, mt: 1 }}>
            <form onSubmit={ onSubmit }>
                <Grid container>
                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Nombre" 
                        type="text" 
                        placeholder='Nombre' 
                        fullWidth
                        required
                        name="nombre"
                        value={ nombre }
                        onChange={ onInputChange }
                        InputProps={{
                            endAdornment: ( 
                              <InputAdornment position='end' onClick={ () => onInputClean('nombre') }>
                                <Cancel />
                              </InputAdornment>
                            ),
                          }}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Descripcion" 
                        placeholder='Descripcion' 
                        fullWidth
                        multiline
                        required
                        rows={4}
                        name="descripcion"
                        value={ descripcion }
                        onChange={ onInputChange }
                        InputProps={{
                            endAdornment: ( 
                              <InputAdornment position='end' onClick={ () => onInputClean('descripcion') }>
                                <Cancel />
                              </InputAdornment>
                            ),
                          }}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 2 }}>
                        <TextField 
                        label="Url Imagen" 
                        type="text" 
                        placeholder='Url' 
                        fullWidth
                        required
                        name="url"
                        value={ url }
                        onChange={ onInputChange }
                        InputProps={{
                            endAdornment: ( 
                              <InputAdornment position='end' onClick={ () => onInputClean('url') }>
                                <Cancel />
                              </InputAdornment>
                            ),
                          }}
                        />
                    </Grid>

                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                        <Typography variant='h6' noWrap component='div'>Ingredientes</Typography>
                    </Grid>
                    
                    <Grid container spacing={ 1 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 10 } sx={{ mt: 2 }}>
                            <TextField 
                            label="Ingrediente" 
                            type="text" 
                            placeholder='Agregar Ingrediente' 
                            fullWidth
                            name="ingrediente"
                            value={ inputValue }
                            onChange={ onInputChangeIn }
                            InputProps={{
                                endAdornment: ( 
                                  <InputAdornment position='end' onClick={ () => onInputChangeInClean() }>
                                    <Cancel />
                                  </InputAdornment>
                                ),
                              }}
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 2 } sx={{ mt: 3 }}>
                            <Button variant='contained' color="info" fullWidth onClick={ onClickAgregar }
                                startIcon={<Add />}>
                                    Agregar
                            </Button>
                        </Grid>
                    </Grid>         

            

                    <Grid container spacing={ 1 } sx={{ mb: 2, mt: 1 }}>
                        <List >
                            {ingredientes.length > 0 && ingredientes.map((item) =>(
                            <ListItem key={item.name}>
                                <ListItemIcon>
                                    <HorizontalRule color="success" fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText sx={{ ml: -4 }}
                                    primary={item.name}
                                />
                                <ListItemIcon sx={{ ml: 2 }}>
                                    <Delete color="error" fontSize="small" sx={{ cursor: 'pointer' }} onClick={ () => onClickEliminar(item) } />
                                </ListItemIcon>
                            </ListItem>
                            ))}
                        </List>
                    </Grid> 

                    {error && error.map((item) => (
                        <Grid key={item.msg} item xs={ 12 } sx={{ mt: 2 }}>
                            <Alert severity="error">{item?.msg}</Alert>
                        </Grid>
                    ))}
                
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={ 12 } sm={ 6 }>
                            { !recetaSelected &&
                                <Button variant='contained' color="success" type='submit' fullWidth
                                    startIcon={<CheckCircle />}>
                                        Confirmar
                                </Button>
                            }
                            { recetaSelected &&
                                <Button variant='contained' color="success" fullWidth onClick={ onClickGuardar }
                                    startIcon={<CheckCircle />}>
                                        Guardar
                                </Button>
                            }
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <Button variant='contained' color="error" fullWidth onClick={ onClickCancelar }
                                startIcon={<Cancel />}>
                                    Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid> 

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
              Receta guardada
            </Alert>
        </Snackbar>
    </RecetasLayout>
  )
}
