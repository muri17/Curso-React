import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../components/NavBar';


const drawerWidth = 280;

export const RecetasLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <NavBar drawerWidth={ drawerWidth } />

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}