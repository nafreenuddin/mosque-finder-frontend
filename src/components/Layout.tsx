// // // src/components/Layout.tsx
// // import { Box, Container } from '@mui/material';
// // import { Link as RouterLink } from 'react-router-dom';
// // import { Button, Stack, Typography } from '@mui/material';

// // export default function Layout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <Box>
// //       {/* Header */}
// //       <Box
// //         component="header"
// //         sx={{ py: 2, bgcolor: 'primary.main', color: 'common.white' }}
// //       >
// //         <Container
// //           sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
// //         >
// //           <Typography variant="h6">MosqueFinder</Typography>
// //           <Stack direction="row" spacing={2}>
// //             <Button component={RouterLink} to="/" color="inherit" size="small">
// //               Home
// //             </Button>
// //             <Button component={RouterLink} to="/about" color="inherit" size="small">
// //               About
// //             </Button>
// //             <Button component={RouterLink} to="/admin/register" color="inherit" size="small">
// //               Register
// //             </Button>
// //             <Button component={RouterLink} to="/admin/login" color="inherit" size="small">
// //               Login
// //             </Button>
// //           </Stack>
// //         </Container>
// //       </Box>

// //       {/* Main content */}
// //       <Box component="main" sx={{ minHeight: 'calc(100vh - 128px)' }}>
// //         {children}
// //       </Box>

// //       {/* Footer */}
// //       <Box
// //         component="footer"
// //         sx={{ py: 4, bgcolor: 'grey.100', textAlign: 'center' }}
// //       >
// //         <Container>
// //           <Typography variant="body2" color="textSecondary">
// //             © {new Date().getFullYear()} MosqueFinder. All rights reserved.
// //           </Typography>
// //         </Container>
// //       </Box>
// //     </Box>
// //   );
// // }


// // src/components/Layout.tsx
// import { Box, Container, Button, Stack, Typography } from '@mui/material';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState } from '../app/store';
// import { logout } from '../features/auth/authSlice';

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

//   const handleLogout = () => {
//     // clear localStorage, redux, then redirect
//     localStorage.removeItem('token');
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <Box>
//       {/* Header */}
//       <Box component="header" sx={{ py:2, bgcolor:'primary.main', color:'common.white' }}>
//         <Container sx={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
//           <Typography variant="h6">MosqueFinder</Typography>
//           <Stack direction="row" spacing={2}>
//             <Button component={RouterLink} to="/" color="inherit" size="small">Home</Button>
//             <Button component={RouterLink} to="/about" color="inherit" size="small">About</Button>

//             {isAuthenticated ? (
//               <Button onClick={handleLogout} color="inherit" size="small">
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button component={RouterLink} to="/admin/register" color="inherit" size="small">
//                   Register
//                 </Button>
//                 <Button component={RouterLink} to="/admin/login" color="inherit" size="small">
//                   Login
//                 </Button>
//               </>
//             )}
//           </Stack>
//         </Container>
//       </Box>

//       {/* Main content */}
//       <Box component="main" sx={{ minHeight:'calc(100vh - 128px)' }}>
//         {children}
//       </Box>

//       {/* Footer */}
//       <Box component="footer" sx={{ py:4, bgcolor:'grey.100', textAlign:'center' }}>
//         <Container>
//           <Typography variant="body2" color="textSecondary">
//             © {new Date().getFullYear()} MosqueFinder. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// }
// src/components/Layout.tsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 240 }}>
      <List>
        <ListItemButton component={RouterLink} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/about">
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/contact">
          <ListItemText primary="Contact" />
        </ListItemButton>

        {!isAuthenticated ? (
          <>
            <ListItemButton component={RouterLink} to="/admin/register">
              <ListItemText primary="Register" />
            </ListItemButton>
            <ListItemButton component={RouterLink} to="/admin/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </>
        ) : (
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger menu on xs */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Clickable Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
              fontWeight: 'bold'
            }}
          >
            MosqueFinder
          </Typography>

          {/* Nav buttons on md+ */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/about">
              About
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contact
            </Button>

            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/admin/register">
                  Register
                </Button>
                <Button color="inherit" component={RouterLink} to="/admin/login">
                  Login
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Container maxWidth="md">{children}</Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 4, bgcolor: 'grey.100', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} MosqueFinder. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
