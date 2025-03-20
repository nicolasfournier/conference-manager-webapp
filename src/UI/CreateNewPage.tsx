import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

/*-----------------------------*/
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
/*-----------------------------*/


function genUniqueId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
}

function SaveNewPage() {
    const title: string = (document.getElementById('titleTextField') as HTMLInputElement).value;
    const content: string = (document.getElementById('contentTextField') as HTMLInputElement).value;
    const lang: string = "EN-en";
    const parentID: string = "defaultEvent";
    const newPageID: string = genUniqueId();

    const createPageResult = async () => {
        await client.models.Page.create({
            pageID: newPageID,
            owner: parentID,
            pageTitle: title,
            pageContent: content,
            language: lang,
            jsonobject: ''
        })
    }
}

function CreateNewPage() {
    return (
        <>
            <TextField
                id='titleTextField'
                label='Name of Menupoint1'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='contentTextField'
                label='Page contents for Menupoint1'
                multiline
                rows={10}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <Button variant="contained" onClick={(event) => { SaveNewPage }}>Create New Page</Button>
        </>
    )
}

export default CreateNewPage;