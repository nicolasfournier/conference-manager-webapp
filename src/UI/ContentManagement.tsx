import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//get the data client and data structures
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
//get the default login tool
import { Authenticator } from "@aws-amplify/ui-react";
//import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();


//provide a page with textfields and image uploads for all the normal website contents
//also a drop-down list to select from some templates
//the contents 
function ContentManagement() {
    return (
        
    );
} 

export default ContentManagement;