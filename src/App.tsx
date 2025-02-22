import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ResponsiveAppBar from './UI/ResponsiveAppBar';
import { Link as DomLink, NavLink } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

function ContentLoader():string {
  return (
    "SOME TEXT"
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/UI/pages" />
      </Routes>
      <Container maxWidth="sm">
        <Box sx={{ typography: 'body1' }}>
          <ContentLoader />
        </Box>
      </Container>
      </BrowserRouter>
      </>
  );
}

/*
      <BrowserRouter basename="/UI/pages">
        </BrowserRouter>


<BrowserRouter>
      <ConferenceLogo />
      <NavigationBar />
      </BrowserRouter>

        <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Create React App example in TypeScript
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
*/