import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';
/*-----------------------------*/
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { LoadBalancingProtocol } from 'aws-cdk-lib/aws-elasticloadbalancing';

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<Schema>();
/*-----------------------------*/

function EditEventData() {
    const [events, setEvents] = useState<Schema["Event"]["type"][]>([]);
    useEffect(() => {
        fetchEvents();
    }, []);

    function genUniqueId(): string {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    }
    

    function saveEventData() {
        /* need to write code to distinguish the different TextFields - thre is a way to get all HTMLElements of the same type and access them as an array.  Or add an index at the end of each name */
        const setID = (document.getElementById('eventTitleTextField') as HTMLInputElement).value;
        const neweventID: string = (setID==='' ? genUniqueId() : setID) ;
        const eventTitle: string = (document.getElementById('eventTitleTextField') as HTMLInputElement).value;
        const type: string = (document.getElementById('eventTypeTextField') as HTMLInputElement).value;
        const eventChair: string = (document.getElementById('eventChairTextField') as HTMLInputElement).value;
        const eventRoleManager: string = (document.getElementById('eventRoleManagerTextField') as HTMLInputElement).value;
        const eventContentEditor: string = (document.getElementById('eventContentEditorTextField') as HTMLInputElement).value;
        const eventLocation: string = (document.getElementById('eventLocationTextField') as HTMLInputElement).value;
        const eventWebpageTheme: string = (document.getElementById('eventWebpageThemeTextField') as HTMLInputElement).value;
        const langOpt: string = (document.getElementById('eventI11NOptionsTextField') as HTMLInputElement).value;
        const lang: string = (document.getElementById('eventDescriptionLanguageTextField') as HTMLInputElement).value;
        console.log(neweventID);
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
                availableLanguages: [langOpt],
                language: lang,
                jsonobject: ''
            })
        }
        console.log('written');

    }
        async function fetchEvents() {
        const { data: events, errors } = await client.models.Event.list();
        setEvents(events);
    };

    return (
        <>
            <TextField
            disabled
                id='eventIDTextField'
                label='Event ID (automatically generated on creation)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].eventID }
            />
            <TextField
                id='eventTitleTextField'
                label='Event Title'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].title}
            />
            <TextField
                id='eventTypeTextField'
                label='Event Type (Conference / Symposium / Workshop / Course / etc)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].eventType }
            />
            <TextField
                id='eventChairTextField'
                label='Chaiperson(s)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].chair }
            />
            <TextField
                id='eventLocationTextField'
                label='Location of the Event'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].location }
            />
            <TextField
                disabled
                id='eventRoleManagerTextField'
                label='Role Manager (person that can manage editing permissions on the website)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].roleManager }
            />
            <TextField
                disabled
                id='eventContentEditorTextField'
                label='People with website editing rights'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].contentsEditor}
            />
            <TextField
                id='eventWebpageThemeTextField'
                label='Website Theme'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].theme }
            />
            <TextField
                id='eventI11NOptionsTextField'
                label='Internationalisation Options'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].availableLanguages}
            />
            <TextField
                id='eventDescriptionLanguageTextField'
                label='Language of this page'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={events.length===0 ? '' : events[0].language}
            />
            <Button variant="contained" onClick={(event) => { saveEventData }}>Save Event Data</Button>
        </>

    );
}
export default EditEventData;