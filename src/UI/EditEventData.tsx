import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

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
    const [selectedEvent, setSelectedEvent] = useState(0);
    useEffect(() => {
        fetchAllEventsFromDB();
    }, []);

    async function fetchAllEventsFromDB() {
        const { data: events, errors } = await client.models.Event.list();
        setEvents(events);
    };

    function genUniqueId(): string {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
    }

    function saveEventData(createNew: boolean) {
        /* need to write code to distinguish the different TextFields - thre is a way to get all HTMLElements of the same type and access them as an array.  Or add an index at the end of each name */
        const setID = (document.getElementById('eventTitleTextField') as HTMLInputElement).value;
        createNew = createNew || (setID === '');
        const neweventID: string = (createNew ? genUniqueId() : setID);
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
        if (createNew) {
            const createNewOperationResults = async () => {
                await client.models.Event.create({
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
        } else {
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
        }
        console.log('written');
    }

    function findEventIndexByID(givenEventID: string) {
        var foundIndex = -1;
        var i=0;
        while ((i<events.length)&&(foundIndex<0)) {
            if (events[i].eventID === givenEventID) foundIndex = i;
            i++;
        }
        return foundIndex;
    }

    const handleEventSelection = (event: SelectChangeEvent) => {
        const foundIndex = findEventIndexByID(event.target.value);
        setSelectedEvent(foundIndex);
    };

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Event</InputLabel>
                <Select
                    labelId="select-event-label"
                    id="select-event"
                    value={events[selectedEvent].eventID}
                    label="Age"
                    onChange={handleEventSelection}
                >
                    {events.map((eventItem) => (<MenuItem value={eventItem.eventID}>{eventItem.title}</MenuItem>))};
                </Select>
            </FormControl>
            <TextField
                disabled
                id='eventIDTextField'
                label='Event ID (automatically generated on creation)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].eventID}
            />
            <TextField
                id='eventTitleTextField'
                label='Event Title'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].title}
            />
            <TextField
                id='eventTypeTextField'
                label='Event Type (Conference / Symposium / Workshop / Course / etc)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].eventType}
            />
            <TextField
                id='eventChairTextField'
                label='Chaiperson(s)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].chair}
            />
            <TextField
                id='eventLocationTextField'
                label='Location of the Event'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].location}
            />
            <TextField
                disabled
                id='eventRoleManagerTextField'
                label='Role Manager (person that can manage editing permissions on the website)'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].roleManager}
            />
            <TextField
                disabled
                id='eventContentEditorTextField'
                label='People with website editing rights'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].contentsEditor}
            />
            <TextField
                id='eventWebpageThemeTextField'
                label='Website Theme'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].theme}
            />
            <TextField
                id='eventI11NOptionsTextField'
                label='Internationalisation Options'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].availableLanguages}
            />
            <TextField
                id='eventDescriptionLanguageTextField'
                label='Language of this page'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={selectedEvent > -1 ? '' : events[selectedEvent].language}
            />
            <Button variant="contained" onClick={(event) => { saveEventData(false) }}>Update Selected Event</Button>
            <Button variant="contained" onClick={(event) => { saveEventData(true) }}>Create New Event</Button>
        </>

    );
}
export default EditEventData;