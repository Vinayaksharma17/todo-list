import React, { useState } from 'react'
import TodoListItem from './TodoListItem';
import { Paper, List, Stack, Button, Box } from '@mui/material'


const TodoList = ({ tasks, updateTask, deleteTask, toggleTask }) => {

    const [filter, setFilter] = useState('active')

    const onButtonClick = (filterType) => () => {
        setFilter(filterType)
    }

    const getFilteredTasks = () => {
        return tasks.filter(task => {
            return (
                !task.deleted && (
                    filter === 'active' && !task.done
                    || filter === 'completed' && task.done
                    || filter === 'all'
                )
            )
        })
    }

    return (
        <Paper
            square={true}
            sx={{ marginTop: 2 }}
        >
            <List>
                {
                    getFilteredTasks().map((task) => { 
                            return (
                                <TodoListItem
                                    key={task.id}
                                    id={task.id}
                                    done={task.done}
                                    description={task.description}
                                    updateTask={updateTask}
                                    toggleTask={toggleTask}
                                    deleteTask={deleteTask}
                                />
                            )
                    })
                }
            </List>
            <Box sx={{ padding: 1 }}>
                <Stack direction="row" justifyContent="center">
                    <Button onClick={onButtonClick('all')}
                        variant={filter === 'all' ? 'outlined' : 'text'}
                    >All
                    </Button>
                    <Button onClick={onButtonClick('active')}
                        variant={filter === 'active' ? 'outlined' : 'text'}
                    >Active
                    </Button>
                    <Button onClick={onButtonClick('completed')}
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                    >Completed</Button>
                </Stack>
            </Box>
        </Paper>
    );
}
export default TodoList;

