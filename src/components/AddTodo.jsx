import { TextInput } from '@sahilkhosla/react-components/dist/components/TextInput'
import React from 'react'
import { useState } from 'react'

export const AddTodo = ({ addTask }) => {

    const [value, setValue] = useState('')

    const handleOnChange = (event) => {
        setValue(event.target.value)
    }
    const handleOnSubmit = (event) => {
        event.preventDefault()
        //add the value as a task..
        addTask(value)
        setValue('')

    }
    return (
        <TextInput
            placeholder="Enter a new task"
            value={value}
            onChange={handleOnChange}
            onSubmit={handleOnSubmit} />
    )
}