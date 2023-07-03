import { Alert, Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Snackbar, TextField, Tooltip, Typography } from "@mui/material"
import { RecetasLayout } from "../layout/RecetasLayout"
import { eliminarReceta, getRecetas } from "../../api/recipesApi"
import {  Add, Delete, Edit, Search, HorizontalRule, Favorite, FavoriteBorderOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../auth"
import { useNavigate } from "react-router-dom"

export const RecetasPage = () => {

  const [recetas = [], setRecetas] = useState([]);
  const [recetasGeneral = [], setRecetasGeneral] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recetaSelected, setRecetaSelected] = useState();
  const { logout, favorites } = useContext( AuthContext );
  const navigate = useNavigate();
  const [ open, setOpen ] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');
  const [ favoritos = [], setfavoritos ] = useState([]);

  const onGetRecetas = async () => {
    const resp = await getRecetas()
    if (resp.length >= 0 ) {
      setRecetas(resp)
      setRecetasGeneral(resp)
    }
    if (resp.response?.status == 401) {
      onLogout()
    }  
  }

  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    setRecetaSelected(item);
  };

  const onClickAgregar = () => {
    navigate('/recetas/agregar');
  }

  const onClickEliminar = async () => {
    const resp = await eliminarReceta(selectedIndex)
    if (resp.msg) {
      onGetRecetas()
      setRecetaSelected(null);
      handleClick()
    }
  }

  const onClickEditar = async () => {
    localStorage.setItem('recetaSelected', JSON.stringify( recetaSelected ) );
    navigate('/recetas/agregar');
  }

  const onLogout = () => {
    logout();
    navigate('auth/login', {
        replace: true
    });
  }

  const onClickAgregarFav = () => {
    setfavoritos([...favoritos,  recetaSelected]) 
  }

  const onClickVerFav = () => {
    setfavoritos([...favoritos,  recetaSelected]) 
  }

  const onInputChange = ({ target }) => {
    setSearchValue( target.value );
    if (target.value == "") {
      setRecetas(recetasGeneral)
      return;
    }
    const reset = recetasGeneral
    const search = reset.filter(item => item.name.toLowerCase().includes(target.value.toLowerCase()));
    setRecetas(search)
    setRecetaSelected();
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

  useEffect(() => {
    onGetRecetas()
  }, [])

  return (
    <RecetasLayout>
        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 6 }>
                <Grid item xs={ 12 } sx={{ mt: 1 }}>
                  <TextField 
                    label="Buscar" 
                    type="search" 
                    placeholder='Buscar' 
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start' >
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    name="search"
                    value={ searchValue }
                    onChange={ onInputChange }
                  />
                </Grid>

                <Grid item xs={ 12 } sx={{ mt: 4 }}>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 300,
                      '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                  >
                    {recetas.length > 0 && recetas.map((item) => (
                      <ListItem key={item._id}>
                        <ListItemButton
                          selected={selectedIndex === item._id}
                          onClick={(event) => handleListItemClick(event, item._id, item)}
                        >
                          <ListItemAvatar>
                            <Avatar alt="sin imagen" src={item.imagePath} />
                          </ListItemAvatar>
                          <ListItemText primary={item.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}             
                  </List>
                </Grid>

                <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={ 12 } sm={ 4 }>
                    <Button disabled={selectedIndex == 0} variant='contained' color="error" fullWidth onClick={ onClickEliminar }
                        startIcon={<Delete />}>
                          Eliminar
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 4 }>
                    <Button disabled={selectedIndex == 0} variant='contained' color="info" fullWidth onClick={ onClickEditar }
                        startIcon={<Edit />}>
                          Editar
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 4 }>
                    <Button variant='contained' color="success" fullWidth onClick={ onClickAgregar } 
                        startIcon={<Add />}>
                          Agregar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              

              <Grid item xs={ 6 } >
                {recetaSelected && (
                  <div className="animate__animated animate__fadeIn" >
                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                      <Typography variant='h4' noWrap component='div' sx={{ ml: 1, textAlign:"center", mb: 2 }}>{recetaSelected?.name}
                      {/* <Tooltip title="Agregar favorito">
                        FavoriteOutlined si esta e fav
                        <IconButton size="large"  color="error" onClick={ onClickAgregarFav } >
                          <FavoriteBorderOutlined   /> 
                        </IconButton>
                      </Tooltip> */}
                      </Typography>
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                      <img height={'100%'} width={'100%'} src={recetaSelected?.imagePath}/>
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                      <Typography sx={{ ml: 1, mb: 2 }}>{recetaSelected?.description}</Typography>
                    </Grid>
                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                      <Typography sx={{ ml: 1}}>Ingredientes:</Typography>
                      <List >
                        {recetaSelected.ingredients.length > 0 && recetaSelected.ingredients.map((item) =>(
                          <ListItem key={item.name}>
                             <ListItemIcon>
                                  <HorizontalRule color="success" fontSize="small"/>
                              </ListItemIcon>
                            <ListItemText sx={{ ml: -4 }}
                              primary={item.name}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </div>
                )} 
              </Grid>
        </Grid>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
              Receta eliminada
            </Alert>
          </Snackbar>
    </RecetasLayout>
  )
}
