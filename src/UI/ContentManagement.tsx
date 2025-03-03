import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

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
        <>
            <TextField
                id='outlined-multiline-static11'
                label='Name of Menupoint1'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='outlined-multiline-static12'
                label='Page contents for Menupoint1'
                multiline
                rows={10}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='outlined-multiline-static21'
                label='Name of Menupoint2'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='outlined-multiline-static22'
                label='Page contents for Menupoint2'
                multiline
                rows={10}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='outlined-multiline-static31'
                label='Name of Menupoint3'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='outlined-multiline-static32'
                label='Page contents for Menupoint3'
                multiline
                rows={10}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
        </>
    );
}

export default ContentManagement;