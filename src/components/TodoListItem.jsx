import { Checkbox, IconButton, ListItem, TextField, Box, ListItemText } from '@mui/material';
import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { grey } from '@mui/material/colors';

const TodoListItem = ({ id, done, description, toggleTask, updateTask, deleteTask }) => {
    const [editing, setEditing] = useState(false)
    const [newDescription, setNewDescription] = useState(description)

    const handleOnClick = () => {
        setEditing(true)
    }

    const handleOnChange = (event) => {
        setNewDescription(event.target.value)
    }

    const handleOnBlur = (event) => {
        setEditing(false)
        // update the parent state (with new description)
    }
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
            setEditing(false)
            //update the parent state (with new description)
            updateTask(id, newDescription)
        }
    }

    const handleOnCancelClick = () => {
        //confrim for deletion
        let confrimed = window.confirm('Are you sure ?')
        if (confrimed) {
            // update the parent state (delete this task)
            deleteTask(id)
        }
    }
    const onCheckboxClick = () => {
        toggleTask(id)
    }

    return (
        <Box>
            <ListItem sx={{ borderBottom: 1, borderColor: grey[400], padding: 1 }}>
                <Checkbox checked={done} onClick={onCheckboxClick} />
                {editing ?
                    (
                        <TextField
                            value={newDescription}
                            onChange={handleOnChange}
                            onBlur={handleOnBlur}
                            onKeyDown={handleKeyDown}
                            fullWidth={true}
                            variant='standard'
                            autoFocus={true}
                        />

                    ) : (
                        <ListItemText onClick={handleOnClick}>
                            {description}
                        </ListItemText>
                    )
                }
                <IconButton onClick={handleOnCancelClick}>
                    <CancelIcon />
                </IconButton>
            </ListItem>
        </Box>
    )
}
export default TodoListItem;