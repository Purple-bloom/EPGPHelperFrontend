import {getAllPlayers} from './PlayerService.js'
import { useEffect, useState } from "react"

export async function getAllCharacters() {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/character/get", {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        data.sort((a, b) => a.name > b.name)
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching players:', error);
        alert('Error fetching players:', error);
        return null; // Or return an empty array or a default value
    }
}

async function getCharactersForPlayerId(id) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/character/get/forplayer/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching Characters:', error);
        alert('Error fetching Characters:', error);
        return null; // Or return an empty array or a default value
    }
}

export function ViewCharactersForPlayer(context) {
    const [players, setPlayers] = useState([]);
    const [characters, setCharacters] = useState([]);

    function updateCharacters(event) {
        event.preventDefault();
        const player = JSON.parse(event.target.value);
        console.log(player);
        getCharactersForPlayerId(player.id).then(
                (charArray) => {
            console.log(charArray);
            setCharacters(charArray);
        });
    }
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
                getCharactersForPlayerId(data[0].id).then(
                        (charArray) => {
                    console.log(charArray);
                    setCharacters(charArray)
                });
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <form onLoad={updateCharacters} onChange={updateCharacters}>
                    <h2>View Characters for Player</h2>
                    <div>
                        <p className="textSmall">Player:</p>
                        <select name="characterPlayerInput" className="textMedium">
                            {players.map(player => (
                                        <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                                    ))}
                        </select>
                    </div>
                </form>
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>
                                Player
                            </th>
                            <th>
                                Character
                            </th>
                            <th>
                                Classification
                            </th>
                        </tr>
                        {characters.length > 0 && (
                                    characters.map((character) => (
                                        <tr key = {character.id}>
                                            <td>{character.player.name}</td>
                                            <td>{character.name}</td>
                                            <td>{character.classification}</td>
                                        </tr>
                                                ))
                                    )}
                    </tbody>
                </table>
            </div>
            );
}

export function ViewAllCharacters(context) {
    const [characters, setCharacters] = useState([]);
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllCharacters();
                setCharacters(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>All Characters</h2>
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>
                                Player
                            </th>
                            <th>
                                Character
                            </th>
                            <th>
                                Classification
                            </th>
                        </tr>
                        {characters.length > 0 && (
                                    characters.map((character) => (
                                        <tr key = {character.id}>
                                            <td>{character.player.name}</td>
                                            <td>{character.name}</td>
                                            <td>{character.classification}</td>
                                        </tr>
                                                ))
                                    )}
                    </tbody>
                </table>
            </div>
            );
}

export function AddCharacterForm(context) {
    function addCharacter(event) {
        event.preventDefault();
        console.log(event);
        const formData = event.target;
        const playerInput = formData.elements["characterPlayerInput"].value;
        const nameInput = formData.elements["characterNameInput"].value;
        const classificationInput = formData.elements["characterClassificationInput"].value;
        const character = {
            "player": JSON.parse(playerInput),
            "name": nameInput,
            "classification": classificationInput
        };
        const bodyString = JSON.stringify(character)
        console.log("bodyString: " + bodyString);

        fetch(process.env.REACT_APP_BACKEND_URL+"/api/character/create", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: bodyString
        })
                .then(response => console.log(response));
    }

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    return (
            <form onSubmit={addCharacter} className="border border-secondary border-2 rounded p-2">
                <h2>Add character</h2>
                <div>
                    <p className="textSmall">Player:</p>
                    <select name="characterPlayerInput" className="textMedium">
                        {players.map(player => (
                                        <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                                ))}
                    </select>
                </div>
                <p className="textSmall">Character name:</p>
                <input name="characterNameInput" className="textMedium" />
                <p className="textSmall">Character classification:</p>
                <div className = "d-flex align-items-center justify-content-center">
                    <select name = "characterClassificationInput" className="textMedium"> 
                        <option name="main" value="main">Main</option>
                        <option name="twink" value="twink">Twink</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            );
}

export function EditCharacterForm(context) {
    const [players, setPlayers] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState(0);
    const [allCharacters, setAllCharacters] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [characterId, setCharacterId] = useState(0);
    const [characterName, setCharacterName] = useState('');
    const [characterClassification, setCharacterClassification] = useState('');
    
    useEffect(() => {
        const fetchAllCharacters = async () => {
            try {
                const data = await getAllCharacters();
                setAllCharacters(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchAllCharacters();
    }, []);

    function updateCharacters(event) {
        event.preventDefault();
        const playerId = parseInt(event.target.value, 10);
        console.log(selectedPlayerId);
        setSelectedPlayerId(playerId);
        console.log(playerId);
        console.log(selectedPlayerId);
        getCharactersForPlayerId(playerId).then(
                (charArray) => {
            console.log(charArray);
            setCharacters(charArray);
            if(charArray.length != 0){
                setCharacterId(charArray[0].id);
                setCharacterName(charArray[0].name);
                setCharacterClassification(charArray[0].classification);
            }
        });
    }

    function updateCharacterSelection(event) {
        event.preventDefault();
        const character = JSON.parse(event.target.value);
        setCharacterId(character.id);
        setCharacterName(character.name);
        setCharacterClassification(character.classification);
    }
    
    function updateCharacterSelectionFromAllCharacters(event) {
        event.preventDefault();
        const character = JSON.parse(event.target.value);
        setSelectedPlayerId(character.player.id);
        setCharacterId(character.id);
        setCharacterName(character.name);
        setCharacterClassification(character.classification);
        getCharactersForPlayerId(character.player.id).then(
                (charArray) => {
            console.log(charArray);
            setCharacters(charArray);
            if(charArray.length != 0){
                setCharacterId(charArray[0].id);
                setCharacterName(charArray[0].name);
                setCharacterClassification(charArray[0].classification);
            }
        });
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
                if(data != null){
                    setSelectedPlayerId(data[0].id);
                    getCharactersForPlayerId(data[0].id).then(
                            (charArray) => {
                        console.log(charArray);
                        setCharacters(charArray);
                        if(charArray.length != 0){
                            setCharacterId(charArray[0].id);
                            setCharacterName(charArray[0].name);
                            setCharacterClassification(charArray[0].classification);
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    function editCharacter(event) {
        event.preventDefault();
        console.log(event);
        const formData = event.target;
        console.log(selectedPlayerId);
        const character = {
            "id": characterId,
            "playerId": selectedPlayerId,
            "name": characterName,
            "classification": characterClassification
        };
        const bodyString = JSON.stringify(character);
        console.log("bodyString: " + bodyString);

        fetch(process.env.REACT_APP_BACKEND_URL+"/api/character/update", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: bodyString
        })
                .then(response => console.log(response));
    }

    return (
            <form onSubmit={editCharacter} className="border border-secondary border-2 rounded p-2">
                <h2>Edit character</h2>
                <div className="d-flex align-items-center justify-content-center my-auto p-1">
                    <p className="textMedium my-auto p-1"> All characters: </p>
                    <select name="characterInput" className="textMedium p-1" onChange={updateCharacterSelectionFromAllCharacters}>
                        {allCharacters.map(character => (
                                <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                        ))}
                    </select>
                </div>
                <div className="d-flex align-items-center justify-content-center my-auto">
                    <p className="textMedium my-auto p-1">Player:</p>
                    <select name="playerInput" value={selectedPlayerId} onChange={updateCharacters} className="textMedium p-1">
                        {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.name}</option>
                                                ))}
                    </select>
                </div>
                <div className="d-flex align-items-center justify-content-center my-auto p-1">
                    <p className="textMedium my-auto p-1"> Character of player: </p>
                    <select name="characterInput" className="textMedium p-1" onChange={updateCharacterSelection}>
                        {characters.map(character => (
                                <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                        ))}
                    </select>
                </div>
                <p className="textSmall">Character ID: {characterId}</p>
                <p className="textSmall">Character name:</p>
                <input name="characterNameInput" className="textMedium" value={characterName} onChange={(e) => setCharacterName(e.target.value)}/>
                <p className="textSmall">Character classification:</p>
                <div className = "d-flex align-items-center justify-content-center">
                    <select name = "characterClassificationInput" className="textMedium" value={characterClassification} onChange={(e) => setCharacterClassification(e.target.value)}> 
                        <option name="main" value="main">Main</option>
                        <option name="twink" value="twink">Twink</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
            );
}


export function DeleteCharacterForm(context) {
    const [players, setPlayers] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [character, setCharacter] = useState([]);

    function updateCharacters(event) {
        event.preventDefault();
        const player = JSON.parse(event.target.value);
        console.log(player);
        getCharactersForPlayerId(player.id).then(
                (charArray) => {
            console.log(charArray);
            if(charArray != null){
                setCharacters(charArray);
                setCharacter(charArray[0]);
            }
        });
    }

    function updateCharacterSelection(event) {
        event.preventDefault();
        if(event.target.value == null){
            return;
        }
        const character = JSON.parse(event.target.value);
        console.log(character);
        setCharacter(character);
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
                getCharactersForPlayerId(data[0].id).then(
                        (charArray) => {
                    console.log(charArray);
                    if(charArray != null){
                        setCharacters(charArray);
                        setCharacter(charArray[0]);
                    }
                });
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []);

    function deleteCharacter(event) {
        event.preventDefault();
        console.log(event);
        
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/character/delete/" + character.id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
                .then(response => console.log(response));
    }

    return (
            <form onSubmit={deleteCharacter} className="border border-secondary border-2 rounded p-2">
                <h2>Delete character</h2>
                <div>
                    <p className="textSmall">Player:</p>
                    <select name="playerInput" onChange={updateCharacters} className="textMedium">
                        {players.map(player => (
                                        <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                                ))}
                    </select>
                </div>
                <div>
                    <p className="textSmall">Character:</p>
                    <select name="characterInput" className="textMedium" onChange={updateCharacterSelection}>
                        {characters.map(character => (
                                <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                        ))}
                    </select>
                </div>
                <p className="textSmall">Character ID: {character ? character.id : 0}</p>
                <p className="textSmall">Character name: {character ? character.name : "Name"}</p>
                <p className="textSmall">Character classification: {character ? character.classification : "Classification"}</p>
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
            );
}