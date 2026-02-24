import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import lootIcon from './img/LootIcon.png'
import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from "./Components/Layout/Navigation";
import Home from "./Components/Home"
import Players from "./Components/PlayerManager"
import Characters from "./Components/CharacterManager"
import Ep from "./Components/EpManager"
import Gp from "./Components/GpManager"
import Raidrewards from "./Components/RaidrewardManager"
import Logs from "./Components/LogViewer"
import RecentLogs from "./Components/RecentLogViewer"
import Settings from "./Components/SettingManager"
import Login from "./Components/Login"
import useToken from './Components/useToken';

function ProtectedRoute({ children, token }) {
    if (!token) {
        console.log("No Token present, redirecting to Login.")
        return <Navigate to='/login' replace />
    }
    return children
}

function App() {
    const { token, setToken } = useToken();

    return (
            <div className="App bg-dark text-light">
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={ < Home / > } />
                        <Route path="/players" element={
                            <ProtectedRoute token={token}> < Players token={token} / > </ProtectedRoute>
                        } />
                        <Route path="/characters" element={
                            <ProtectedRoute token={token}> < Characters token={token} / > </ProtectedRoute>
                        } />
                        <Route path="/raidrewards" element={
                            <ProtectedRoute token={token}> < Raidrewards token={token} / > </ProtectedRoute>
                        } />
                        <Route path="/gp" element={
                            <ProtectedRoute token={token}> < Gp token={token} / > </ProtectedRoute>
                        } />
                        <Route path="/ep" element={
                             <ProtectedRoute token={token}> < Ep token={token} / > </ProtectedRoute>
                         } />
                        <Route path="/log" element={ < Logs / > } />
                        <Route path="/recentlogs" element={ < RecentLogs / > } />
                        <Route path="/settings" element={
                            <ProtectedRoute token={token}> < Settings token={token} / > </ProtectedRoute>
                        } />
                        <Route path="/login" element={ < Login setToken={setToken} / > } />
                    </Routes>
                </BrowserRouter>
            </div>
            );
};

export default App;
