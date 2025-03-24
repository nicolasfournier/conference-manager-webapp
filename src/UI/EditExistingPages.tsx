import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
Amplify.configure(outputs);

/*-----------------------------*/
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
/*-----------------------------*/



function EditExistingPages() {
    const [pages, setPages] = useState<Schema["Page"]["type"][]>([]);
    useEffect(() => {
        fetchPages();
    }, []);

    async function  fetchPages () {
        const { data: pages, errors } = await client.models.Page.list();
        setPages(pages);
    };

    async function savePage(index: number) {
        const existingPageID: string = (document.getElementById('pageIDTextField-'+{index}) as HTMLInputElement).value;
        const parentID: string = (document.getElementById('parentIDTextField-'+{index}) as HTMLInputElement).value;
        const title: string = (document.getElementById('pageTitleTextField-'+{index}) as HTMLInputElement).value;
        const content: string = (document.getElementById('pageContentTextField-'+{index}) as HTMLInputElement).value;
        const lang: string = (document.getElementById('pageLanguageTextField-'+{index}) as HTMLInputElement).value;
        const updatedOperationResults = async () => {
            await client.models.Page.update({
                pageID: existingPageID,
                parentevent: parentID,
                pageTitle: title,
                pageContent: content,
                language: lang,
                jsonobject: ''
            })
        }
        fetchPages();
    }

    return (
        <>
            {pages.map(({ pageID, belongstoevent, pageTitle, pageContent, language }, index) => (
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
                        defaultValue={belongstoevent}
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
                    <Button variant="contained" onClick={(event) => { savePage(index) }}>Save Page</Button>
                </>
            ))}
        </>
    );
}
export default EditExistingPages;