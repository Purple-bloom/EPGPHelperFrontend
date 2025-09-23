import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.svg';
import lootIcon from './img/LootIcon.png'
import './App.css';
import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
    return (
            <div className="App bg-dark text-light">
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={ < Home / > } />
                        <Route path="/players" element={ < Players / > } />
                        <Route path="/characters" element={ < Characters / > } />
                        <Route path="/raidrewards" element={ < Raidrewards / > } />
                        <Route path="/gp" element={ < Gp / > } />
                        <Route path="/ep" element={ < Ep / > } />
                        <Route path="/log" element={ < Logs / > } />
                        <Route path="/recentlogs" element={ < RecentLogs / > } />
                        <Route path="/settings" element={ < Settings / > } />
                    </Routes>
                </BrowserRouter>
            </div>
            );
};

export default App;
