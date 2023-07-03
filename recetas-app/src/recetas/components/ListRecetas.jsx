import { Add, Delete, Edit, Search } from "@mui/icons-material";
import { Avatar, Button, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarReceta } from "../../api/recipesApi";

export const ListRecetas = ( {recetas, recetasGeneral} ) => {

    // const [recetas, setRecetas] = useState([]);
    // const [recetasGeneral = [], setRecetasGeneral] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recetaSelected, setRecetaSelected] = useState();
    const [ searchValue, setSearchValue ] = useState('');
    const navigate = useNavigate();

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

      const onInputChange = ({ target }) => {
        setSearchValue( target.value );
        if (target.value == "") {
        //   setRecetas(recetasGeneral)
          return;
        }
        const reset = recetasGeneral
        const search = reset.filter(item => item.name.toLowerCase().includes(target.value.toLowerCase()));
        // setRecetas(search)
        // setRecetaSelected();
    }
    

  return (
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
  )
}
