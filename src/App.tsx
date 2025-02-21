import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import ResponsiveAppBar from './UI/ResponsiveAppBar';

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

export default function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="sm">
        <Box sx={{ typography: 'body1' }}>
          typography:body1  lorem ipsum quod
          but then the quick brown fox had enough
          und er wollte nicht mehr springen
        </Box>
        <Box sx={{ typography: 'body2' }}>
          typography:body2  lorem ipsum quod
          but then the quick brown fox had enough
          und er wollte nicht mehr springen
        </Box>
        <Box sx={{ typography: 'heading1' }}>
          typography:heading1  lorem ipsum quod
          but then the quick brown fox had enough
          und er wollte nicht mehr springen
        </Box>
        <Box sx={{ fontSize: 'h1.fontSize' }}>
          fontSize: h1.fontSize
        </Box>
        <Box sx={{ fontSize: 'h2.fontSize' }}>
          fontSize: h2.fontSize
        </Box>
        <Box sx={{ fontSize: 'h3.fontSize' }}>
          fontSize: h3.fontSize
        </Box>
        <Box sx={{ fontSize: 'h4.fontSize' }}>
          fontSize: h4.fontSize
        </Box>
        <Box sx={{ fontSize: 'h5.fontSize' }}>
          fontSize: h5.fontSize
        </Box>
        <Box sx={{ fontSize: 'h6.fontSize' }}>
          fontSize: h6.fontSize
        </Box>
        <Box sx={{ fontSize: 'h7.fontSize' }}>
          fontSize: h7.fontSize
        </Box>
      </Container>
    </>
  );
}

/*
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