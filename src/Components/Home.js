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
                <p className = "textSmall">This is an EPGP helper. This website allows you to award EP and GP by character-to-player matching, add players and their characters, export to a supported addon (like https:\/\/github.com/Purple-bloom/EpgpWhisperer) </p>
                <p className = "textSmall">Enjoy!</p>

            </div>
            );
}
