import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ResponsiveAppBar from './UI/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentManagement from './UI/ContentManagement'

//get the data client and data structures
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
//get the default login tool
import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();

export default function App() {
  const [pageContents, setPageContents] = React.useState('');
  const handlePageSelection = (newcontents: string) => {
    setPageContents(newcontents);
  }

  //not entirely sure how to best code this
  //the example puts a fuction in the Authenticator
  //    {
  //      ({ signOut, user }) => 
  //        ( 
  //     ...lots of html page text only accessible after login
  //        )
  //    }
  // it could be that the Authenticator calls this in some way

  const handleLogin = () => {
    return (
      <Authenticator>
      </Authenticator>
    );
  }



  function ContentLoader() {
    if (pageContents === "CMS") {
      return (
        <ContentManagement />
      );
    } else {
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
  }
  /*
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: 'text.secondary',
          }}
        >
          {pageContents}
        </Typography>
        */
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