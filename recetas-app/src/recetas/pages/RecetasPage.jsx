import { Avatar, Button, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import { RecetasLayout } from "../layout/RecetasLayout"
import { getRecetas } from "../../api/recipesApi"
import {  Add, Delete, Edit, Search, Circle } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../auth"
import { Navigate } from "react-router-dom"

export const RecetasPage = () => {

  const [recetas = [], setRecetas] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [recetaSelected, setRecetaSelected] = useState();
  const { logout } = useContext( AuthContext )

  const onGetRecetas = async () => {
    const resp = await getRecetas()
    if (resp.length >= 0 ) {
      setRecetas(resp)
    }
    if (resp.response?.status == 401) {
      onLogout()
    }  
  
    console.log(resp)
  }

  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    setRecetaSelected(item);
  };

  const onLogout = () => {
    logout();
    Navigate('auth/login', {
        replace: true
    });
  }

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
                      endAdornment: (
                        <InputAdornment position='end' >
                          <Search />
                        </InputAdornment>
                      ),
                    }}
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
                    <Button variant='contained' fullWidth>
                      <Delete />
                      <Typography sx={{ ml: 1 }}>Eliminar</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 4 }>
                    <Button variant='contained' fullWidth>
                      <Edit />
                      <Typography sx={{ ml: 1 }}>Editar</Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={ 12 } sm={ 4 }>
                    <Button variant='contained' fullWidth>
                      <Add />
                      <Typography sx={{ ml: 1 }}>Agregar</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              

              <Grid item xs={ 6 } >
                {recetaSelected && (
                  <div className="animate__animated animate__fadeIn" >
                    <Grid item xs={ 12 } sx={{ mt: 1 }}>
                      <Typography variant='h4' noWrap component='div' sx={{ ml: 1, textAlign:"center", mb: 2 }}>{recetaSelected?.name}</Typography>
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
                          <ListItem>
                            <ListItemIcon>
                              <Circle fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText
                              primary="Single-line item"
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </div>
                )} 
              </Grid>
        </Grid>
    </RecetasLayout>

  )
}
