import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm'; 
import TaskList from '../components/TaskList';

const TaskPage = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks(); 
    }, [token]);

    return (
        <div>
            <h1>Tasks</h1>
            <TaskForm fetchTasks={fetchTasks} /> 
            <TaskList fetchTasks={fetchTasks} />
        </div>
    );
};

export default TaskPage;
