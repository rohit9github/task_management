import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import RegisterPage from './pages/Register';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/register" element={<RegisterPage setToken={setToken} />} />
                    <Route path="/login" element={<LoginPage setToken={setToken} />} />
                    <Route path="/tasks" element={token ? <TaskPage /> : <LoginPage setToken={setToken} />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
