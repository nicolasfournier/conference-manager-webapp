import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
/*-----------------------------*/
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
/*-----------------------------*/

function SaveEventData() {
    /* need to write code to distinguish the different TextFields - thre is a way to get all HTMLElements of the same type and access them as an array.  Or add an index at the end of each name */
    const neweventID: string = (document.getElementById('eventIDTextField') as HTMLInputElement).value;
    const eventTitle: string = (document.getElementById('eventTitleTextField') as HTMLInputElement).value;
    const type: string = (document.getElementById('eventTypeTextField') as HTMLInputElement).value;
    const eventChair: string = (document.getElementById('eventChairTextField') as HTMLInputElement).value;
    const eventRoleManager: string = (document.getElementById('eventRoleManagerTextField') as HTMLInputElement).value;
    const eventContentEditor: string = (document.getElementById('eventContentEditorTextField') as HTMLInputElement).value;
    const eventLocation: string = (document.getElementById('eventLocationTextField') as HTMLInputElement).value;
    const eventWebpageTheme: string = (document.getElementById('eventWebpageThemeTextField') as HTMLInputElement).value;
    const lang: string = (document.getElementById('eventLanguageTextField') as HTMLInputElement).value;

    const updatedOperationResults = async () => {
        await client.models.Event.update({
            eventID: neweventID,
            title: eventTitle,
            eventType: type,
            chair: [eventChair],
            roleManager: [eventRoleManager],
            contentsEditor: [eventContentEditor],
            location: eventLocation,
            theme: eventWebpageTheme,
            language: lang,
            jsonobject: ''
        })
    }
}

function EditEventData() {
    const [events, setEvents] = useState<Schema["Event"]["type"][]>([]);

    const fetchEvents = async () => {
        const { data, errors } = await client.models.Event.list();
        setEvents(data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <TextField
                id='eventIDTextField'
                label='eventID'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventTitleTextField'
                label='eventTitle'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventTypeTextField'
                label='eventType'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={'Conference / Symposium / Workshop / Course / etc'}
            />
            <TextField
                id='eventChairTextField'
                label='eventChair'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventLocationTextField'
                label='eventLocation'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventRoleMangerTextField'
                label='eventRoleManager'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                disabled
                id='eventContentEditorTextField'
                label='eventContentEditor'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventWebpageThemeTextField'
                label='eventWebpageTheme'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventI11NOptionsTextField'
                label='eventI11NOptions'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='eventDescriptionLanguage'
                label='eventDescriptionLanguage'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <Button variant="contained" onClick={(event) => { SaveEventData }}>Save Event Data</Button>
        </>

    );
}
export default EditEventData;