import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import logo from '../logo.svg';
import lootIcon from '../img/LootIcon.png'
import {GetPlayerForIdForm, GetPlayerForNameForm, AddPlayerForm, getAllPlayers, SelectPlayer} from '../Services/PlayerService.js'
import {AddCharacterForm} from '../Services/CharacterService.js'
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";

export default function Home() {
    return (
            <div className="bg-dark text-light app-container">
                <img src={lootIcon} className="App-logo" alt="logo" />
                <p className = "textSmall">Ich hab so einen trockenen Mund! Hast du vielleicht eine nasse Zunge für mich?</p>
            </div>
            );
}
