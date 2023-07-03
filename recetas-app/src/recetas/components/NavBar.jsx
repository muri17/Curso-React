import { AppBar, Avatar, Badge, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { AccountCircle, Favorite, LogoutOutlined, MenuOutlined, Star } from '@mui/icons-material';
import { AuthContext } from '../../auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const NavBar = ({ drawerWidth = 240 }) => {

    const { user, logout } = useContext( AuthContext )
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const onLogout = () => {
        logout();
        navigate('auth/login', {
            replace: true
        });
        setAnchorEl(null);
    }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };  

    const onClickAgregar = () => {
      navigate('/recetas/agregar');
    }

    const onClickHome = () => {
      navigate('/recetas');
    }

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100%)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h4' noWrap component='div' onClick={ onClickHome } sx={{cursor: 'pointer'}} > Recetas </Typography>

                {/* <Tooltip title="Ver favoritos">
                  <IconButton size="large"  color="inherit">
                    <Badge badgeContent={4} color="error" >
                      <Favorite />
                    </Badge>
                  </IconButton>
                </Tooltip> */}
              <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="NN" src="https://th.bing.com/th/id/OIP.eZXTwDOTyytLaXX-JO845AHaHa?pid=ImgDet&w=100&h=100&c=7&dpr=1,5"  sx={{ width: 56, height: 56 }}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Typography sx={{ ml: 2, mr: 2}}>{user.email}</Typography>
                <MenuItem onClick={ onClickAgregar }>Agregar receta </MenuItem>
                <MenuItem onClick={ onLogout }>Cerrar sesion </MenuItem>
              </Menu>
            </div>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}