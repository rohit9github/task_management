import { useState, useEffect } from 'react';
import api from '../api';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const TaskList = ({ fetchTasks }) => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const response = await api.get('/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []); 

    const handleComplete = async (taskId) => {
        try {
            await api.put(`/tasks/${taskId}/complete`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks(); 
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks(); 
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <List>
            {tasks.map((task) => (
                <ListItem key={task._id}>
                    <ListItemText primary={task.description} secondary={`Category: ${task.category}`} />
                    <Button onClick={() => handleComplete(task._id)} variant="contained">Complete</Button>
                    <Button onClick={() => handleDelete(task._id)} variant="contained" color="error">Delete</Button>
                </ListItem>
            ))}
        </List>
    );
};

export default TaskList;
