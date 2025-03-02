import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './UI/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  const [pageContents, setPageContents] = React.useState('');
  const handlePageSelection = (newcontents: string) => {
    setPageContents(newcontents);
  }

  function ContentLoader() {
    return (
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: 'text.secondary',
        }}
      >
        {pageContents}
      </Typography>
    );
  }

  /* NOT SURE HOW TO PROPERLY USE THE ROUTES, BUT 
     IT DOESN'T WORK WITHOUT THE BROWSERROUTER
  */
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar setPageContentsHandler={handlePageSelection} />
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
        <ResponsiveAppBar setPageContentsHandler={handlePageSelection} />
        <Routes>
          <Route path="/UI/" />
        </Routes>
        <Container maxWidth="sm">
          <Box sx={{ typography: 'body1' }}>
            <ContentLoader />
          </Box>
        </Container>
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