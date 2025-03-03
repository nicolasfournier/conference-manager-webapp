import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ContentManagement from './UI/ContentManagement'


import { NavLink } from "react-router-dom";

type Page = { id: number, title: string, path: string, content: string };
const pages: Page[] = [
  {
    id: 1,
    title: 'Overview',
    path: '/page/overview',
    content: 'This is the content of the Overview page',
  },
  {
    id: 2,
    title: 'Programme',
    path: '/page/programmme',
    content: 'This is the content of the Programme page',
  },
  {
    id: 3,
    title: 'Venue',
    path: '/page/venue',
    content: 'This is the content of the Venue page',
  },
];

type Setting = { id: number, title: string, path: string, content: string };
const settings: Setting[] = [
  {
    id: 1001,
    title: 'Login',
    path: '/setting/login',
    content: 'This is the content of the Login option',
  },
  {
    id: 1002,
    title: 'My Profile',
    path: '/setting/profile',
    content: 'This is the content of the Profile option',
  },
  {
    id: 1003,
    title: 'My Submissions',
    path: '/setting/submissions',
    content: 'This is the content of the Submissions option',
  },
  {
    id: 1004,
    title: 'Content Management',
    path: '/setting/contentmanagement',
    content: 'CMS',
  },
  {
    id: 1005,
    title: 'Logout',
    path: '/setting/logout',
    content: 'This is the content of the Logout option',
  },
];

type ResponsiveAppBarType = { setPageContentsHandler: (content: string) => void; };
function ResponsiveAppBar({ setPageContentsHandler }: ResponsiveAppBarType) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  type SelectedMenuItemEvent = React.MouseEvent<HTMLLIElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  type HandleCloseNavMenu = { page: Page, event: SelectedMenuItemEvent }
  const handleCloseNavMenu = ({ page, event }: HandleCloseNavMenu) => {
    setAnchorElNav(null);
    setPageContentsHandler(page.content);
  };

  type HandleCloseUserMenu = { setting: Setting, event: SelectedMenuItemEvent }
  const handleCloseUserMenu = ({ setting, event }: HandleCloseUserMenu) => {
    setAnchorElUser(null);
    setPageContentsHandler(setting.content);
  };

  /*
  import Routes from './Routes';
  const activeRoute = (routeName: string) => {
    return props.location.pathname === routeName ? true : false;

            Routes.map((elem) => {
                <NavLink to={elem.path} style={{ textDecoration: 'none' }} key={key}>
                  <MenuItem selected={activeRoute(elem.path)}>
                    <ListItemText primary={elem.navbarName} />
                  </MenuItem>
                </NavLink>
            })

    }
*/
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Box component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 67 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="conference logo"
              src="./src/UI/logo-wood-broad.jpg"
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={(event) => { handleCloseNavMenu({ page, event }) }}>
                  <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CONF LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={(event) => { handleCloseNavMenu({ page, event }) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Username" src="./src/UI/logo-wood.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={(event) => handleCloseUserMenu({ setting, event })}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
