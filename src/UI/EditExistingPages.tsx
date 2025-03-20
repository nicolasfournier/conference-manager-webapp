import Button from '@mui/material/Button';
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

/*-----------------------------*/
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
const client = generateClient<Schema>();
/*-----------------------------*/

function SavePage() {
    /* need to write code to distinguish the different TextFields - thre is a way to get all HTMLElements of the same type and access them as an array.  Or add an index at the end of each name */
    const newPageID: string = (document.getElementsById('pageIDTextField') as HTMLInputElement).value;
    const title: string = (document.getElementsById('titleTextField') as HTMLInputElement).value;
    const content: string = (document.getElementsById('contentTextField') as HTMLInputElement).value;
    const lang: string = "EN-en";
    const parentID: string = (document.getElementsById('parentIDTextField') as HTMLInputElement).value;

    const savePageResult = async () => {
        await client.models.Page.update({
            pageID: newPageID,
            owner: parentID,
            pageTitle: title,
            pageContent: content,
            language: lang,
            jsonobject: ''
        })
    }
}

function EditExistingPages() {
    return (
        <>
            <TextField
                id='pageIDTextField'
                label='pageID'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='parentIDTextField'
                label='pageID'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
            <TextField
                id='titleTextField'
                label='Name of Menupoint1'
                rows={1}
                fullWidth
                variant='outlined'
                defaultValue={''}
            />
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
            <Button variant="contained" onClick={(event) => { SavePage }}>Save Page</Button>
        </>
    )
}

export default EditExistingPages;