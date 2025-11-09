import { useEffect, useState } from "react"
import { getAllCharacters } from "../Services/CharacterService.js"

export function ListAllPlayers(context) {
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
            <div className="border border-secondary border-2 rounded p-2">
                <h2>List of all players:</h2>
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Player
                            </th>
                            <th>
                                Characters
                            </th>
                            <th>
                                Rank
                            </th>
                            <th>
                                EP
                            </th>
                            <th>
                                GP
                            </th>
                            <th>
                                Prio
                            </th>
                            <th>
                                Active
                            </th>
                        </tr>
                        {players.length > 0 && (
                                            players.map((player) => (
                                                <tr key = {player.id}>
                                                    <td>{player.id}</td>
                                                    <td>{player.name}</td>
                                                    <td>{player.characters.join('\n')}</td>
                                                    <td>{player.rank}</td>
                                                    <td>{player.ep}</td>
                                                    <td>{player.gp}</td>
                                                    <td className="text-warning">{player.prio}</td>
                                                    <td>{player.active.toString()}</td>
                                                </tr>
                                                        ))
                                            )}
                    </tbody>
                </table>
            </div>
            );
}

export function GetPlayerForIdForm(context) {

    function searchForPlayer(formdata) {
        const id = formdata.get("playerIdInput");
        console.log(id);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/get/" + id, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => response.json()
                            .then(data => alert(JSON.stringify(data))));
    }

    return (
            <form action = {searchForPlayer} className="border border-secondary border-2 rounded p-2">
                <h2>Search player by ID:</h2>
                <div className="d-flex align-items-center justify-content-center">
                    <input name = "playerIdInput" className="textMedium"/>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </div>
            </form>
            );
}

export function GetPlayerForNameForm(context) {

    function searchForPlayer(formdata) {
        const name = formdata.get("playerNameInput");
        console.log(name);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/get/name/" + name, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => response.json()
                            .then(data => alert(JSON.stringify(data))));
    }

    return (
            <form action = {searchForPlayer} className="border border-secondary border-2 rounded p-2">
                <h2>Search player by Name:</h2>
                <div className="d-flex align-items-center justify-content-center">
                    <input name = "playerNameInput" className="textMedium"/>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </div>
            </form>
            );
}


export function AddPlayerForm(context) {

    function addPlayer(formdata) {
        const player = {
            "name": formdata.get("playerNameInput"),
            "rank": formdata.get("playerRankInput")
        }
        console.log(player);
        console.log(JSON.stringify(player));

        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/create", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
                .then(response => {
                    console.log(response); 
                    window.location.reload();
                });
    }

    return (
            <form action = {addPlayer} className="border border-secondary border-2 rounded p-2">
                <h2>Add player</h2>
                <div>
                    <p className="textSmall">Player Name:</p>
                    <input name = "playerNameInput" className="textMedium"/>
                </div>
                <p className="textSmall">Player Rank:</p>
                <div className="d-flex align-items-center justify-content-center">
                    <select name = "playerRankInput" className="textMedium form-select"> 
                        <option name="Member">Member</option>
                        <option name="Officer">Officer</option>
                        <option name="Guildmaster">Guildmaster</option>
                    </select>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </div>
            </form>
            );
}

export function EditPlayerForm(context) {
    const [players, setPlayers] = useState([]);
    const [playerId, setPlayerId] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [playerRank, setPlayerRank] = useState('');
    const [playerEp, setPlayerEp] = useState('');
    const [playerGp, setPlayerGp] = useState('');
    const [playerActive, setPlayerActive] = useState('');

    function editPlayer(formdata) {
        const player = {
            "id": playerId,
            "name": formdata.get("playerNameInput"),
            "rank": formdata.get("playerRankInput"),
            "ep": formdata.get("playerEpInput"),
            "gp": formdata.get("playerGpInput"),
            "active": formdata.get("playerActiveInput")
        }
        console.log(player)
        console.log(JSON.stringify(player))

        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/update", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
                .then(response => {
                    console.log(response); 
                    window.location.reload();
                });
    }

    function updatePlayerSelection(context) {
        const player = JSON.parse(context.target.value);
        console.log(player);
        setPlayerName(player.name);
        setPlayerRank(player.rank);
        setPlayerEp(player.ep);
        setPlayerGp(player.gp);
        setPlayerId(player.id);
        setPlayerActive(player.active);
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
                console.log(data);
                let player = data[0];
                if(player != null){
                    setPlayerName(player.name);
                    setPlayerRank(player.rank);
                    setPlayerEp(player.ep);
                    setPlayerGp(player.gp);
                    setPlayerId(player.id);
                    setPlayerActive(player.active);
                }
            } catch (error) {
                console.error('Error fetching Players:', error);
            }
        };
        fetchPlayers();
    }
    , []);

    return (
            <form action = {editPlayer} className="border border-secondary border-2 rounded p-2">
                <h2>Edit player</h2>
                <div>
                    <select name="playerInput" className="textMedium" onChange= {updatePlayerSelection}>
                        {players.length > 0 && players.map(player => (
                                        <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                                ))}
                    </select>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <p className="textMedium w-50 mt-3" >ID: {playerId}</p>
                    <input name="playerNameInput" className="textMedium w-75 mx-2" value={playerName} onChange={(e) => setPlayerName(e.target.value)}/>
                    <select name="playerRankInput" className="textSmall form-select w-50" value={playerRank} onChange={(e) => setPlayerRank(e.target.value)} >
                        <option name="Member">Member</option>
                        <option name="Officer">Officer</option>
                        <option name="Guildmaster">Guildmaster</option>
                    </select>
                </div>
                <div className="d-flex align-items-center justify-content-center my-auto">
                    <p className="textMedium my-auto">EP: </p>
                    <input name="playerEpInput" className="textMedium w-75 mx-2" value={playerEp} onChange={(e) => setPlayerEp(e.target.value)}/>
                    <p className="textMedium my-auto">GP: </p>
                    <input name="playerGpInput" className="textMedium w-75 mx-2" value={playerGp} onChange={(e) => setPlayerGp(e.target.value)}/>
                </div>
                <div className="d-flex align-items-center justify-content-center my-auto mt-3">
                    <p className="textMedium my-auto">Active: </p>
                    <select name="playerActiveInput" className="textSmall form-select w-50" value={playerActive} onChange={(e) => setPlayerActive(e.target.value)} >
                        <option name="true">True</option>
                        <option name="false">False</option>
                    </select>
                    <button type ="submit" className = "btn btn-primary">Update</button>
                </div>
            </form>
            );
}

export async function getAllPlayers()
{
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/get", {
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
        alert('Error fetching players:' + error);
        return null; // Or return an empty array or a default value
    }
}

export function DeletePlayerForm(context) {
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState([]);

    function deletePlayer(event) {
        event.preventDefault();
        if( window.confirm("Are you sure you want to delete the player " + player.name + "?") === false ){
            return;
        }
        console.log(player);

        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/delete/"+player.id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
                .then(response => {
                    console.log(response); 
                    window.location.reload();
                });
    }

    function updatePlayerSelection(context) {
        const player = JSON.parse(context.target.value);
        console.log(player);
        setPlayer(player);
    }

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getAllPlayers();
                setPlayers(data);
                console.log(data);
                if(data[0] != null){
                    setPlayer(data[0]);
                }
            } catch (error) {
                console.error('Error fetching Players:', error);
            }
        };
        fetchPlayers();
    }
    , []);
    
    return (
            <form onSubmit={deletePlayer} className="border border-secondary border-2 rounded p-2">
                <h2>Delete Player</h2>
                <div>
                    <p className="textSmall">Player:</p>
                    <select name="playerInput" onChange={updatePlayerSelection} className="textMedium">
                        {players.map(player => (
                                        <option key={player.id} value={JSON.stringify(player)}>{player.name}</option>
                                                ))}
                    </select>
                </div>
                <p className="textSmall">Player ID: {player.id}</p>
                <p className="textSmall">Player name: {player.name}</p>
                <p className="textSmall">Player classification: {player.rank}</p>
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
            );
}