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

function SavePage(index: number) {
    /* need to write code to distinguish the different TextFields - thre is a way to get all HTMLElements of the same type and access them as an array.  Or add an index at the end of each name */
    const existingPageID: string = (document.getElementById('pageIDTextField-'+{index}) as HTMLInputElement).value;
    const parentID: string = (document.getElementById('parentIDTextField-'+{index}) as HTMLInputElement).value;
    const title: string = (document.getElementById('pageTitleTextField-'+{index}) as HTMLInputElement).value;
    const content: string = (document.getElementById('pageContentTextField-'+{index}) as HTMLInputElement).value;
    const lang: string = (document.getElementById('pageLanguageTextField-'+{index}) as HTMLInputElement).value;
    const updatedOperationResults = async () => {
        await client.models.Page.update({
            pageID: existingPageID,
            owner: parentID,
            pageTitle: title,
            pageContent: content,
            language: lang,
            jsonobject: ''
        })
    }
}

function EditExistingPages() {
    const [pages, setPages] = useState<Schema["Page"]["type"][]>([]);
    const fetchPages = async () => {
        const { data: items, errors } = await client.models.Page.list();
        setPages(items);
    };

    useEffect(() => {
        fetchPages();
    }, []);


    return (
        <>
            {pages.map(({ pageID, partOfEvent, pageTitle, pageContent, language }, index) => (
                <>
                    <TextField
                        disabled
                        id='pageIDTextField-${index}'
                        label='pageID-'
                        rows={1}
                        fullWidth
                        variant='outlined'
                        defaultValue={pageID}
                    />
                    <TextField
                        disabled
                        id='parentIDTextField-${index}'
                        label='parentID-${index}'
                        rows={1}
                        fullWidth
                        variant='outlined'
                        defaultValue={partOfEvent}
                    />
                    <TextField
                        id='pageTitleTextField-${index}'
                        label='pageTitle-${index}'
                        rows={1}
                        fullWidth
                        variant='outlined'
                        defaultValue={pageTitle}
                    />
                    <TextField
                        id='pageContentTextField-${index}'
                        label='pageContent-${index}'
                        multiline
                        rows={10}
                        fullWidth
                        variant='outlined'
                        defaultValue={pageContent}
                    />
                    <TextField
                        id='pageLanguageTextField-${index}'
                        label='pageLanguage-${index}'
                        rows={1}
                        fullWidth
                        variant='outlined'
                        defaultValue={language}
                    />
                    <Button variant="contained" onClick={(event) => { SavePage(index) }}>Save Page</Button>
                </>
            ))}
        </>

    );
}
export default EditExistingPages;