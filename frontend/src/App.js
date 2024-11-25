import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginForm from './LoginPage/LoginPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" exact element={<LoginForm/>}/>
                {/* Additional routes like AdminPage can be added here */}
            </Routes>
        </Router>
    );
};

export default App;
