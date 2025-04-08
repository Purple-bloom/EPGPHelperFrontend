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
import SoftReserves from "./Components/SrManager"
import Items from "./Components/ItemManager"
import Raidruns from "./Components/RaidrunManager"
import Ep from "./Components/EpManager"
import Gp from "./Components/GpManager"
import Raidrewards from "./Components/RaidrewardManager"

function App() {
    return (
            <div className="App bg-dark text-light">
                <BrowserRouter>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={ < Home / > } />
                        <Route path="/players" element={ < Players / > } />
                        <Route path="/characters" element={ < Characters / > } />
                        <Route path="/items" element={ < Items / > } />
                        <Route path="/softreserves" element={ < SoftReserves / > } />
                        <Route path="/raidruns" element={ < Raidruns / > } />
                        <Route path="/raidrewards" element={ < Raidrewards / > } />
                        <Route path="/gp" element={ < Gp / > } />
                        <Route path="/ep" element={ < Ep / > } />
                    </Routes>
                </BrowserRouter>
            </div>
            );
};

export default App;
