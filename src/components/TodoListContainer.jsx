import { useState } from "react"
import { AddTodo } from "./AddTodo"
import TodoList from "./TodoList"
import { useEffect } from "react"

export const TodoListContainer = () => {
    //task - object
    //done - boolen
    //id - timestamp
    //description - text

    const [tasks, setTasks] = useState([])
    const [firstLoad, setFirsLaod] = useState(true)

    useEffect(() => {
        if (firstLoad) {
            const tasksFromStorage = localStorage.getItem('tasks') || '[]'
            setTasks(JSON.parse(tasksFromStorage))
            setFirsLaod(false)
        }
    })

    //update the localStorge (anytime we update state)
    // on first load - we need to pull from the localStorage and render 
    const updateStorage = (updatedTasks) => {
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }

    const addTask = (description) => {
        //... three dots are used to destructure existing task so that we make a copy
        const updatedTasks = [
            ...tasks, {
                id: Date.now(),
                done: false,
                description: description
            }
        ]
        updateStorage(updatedTasks)
    }

    const updateTasks = (id, description) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.description = description
            }
            return task
        })
        updateStorage(updatedTasks)
    }

    const toggleTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.done = !task.done
            }
            return task
        })
        updateStorage(updatedTasks)
    }

    const deleteTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                task.deleted = true
            }
            return task
        })
        updateStorage(updatedTasks)
    }

    return (
        <>
            <AddTodo
                addTask={addTask}
            />
            <TodoList
                tasks={tasks}
                updateTask={updateTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
            />
        </>
    )
}