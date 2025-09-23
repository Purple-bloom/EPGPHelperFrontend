import { useEffect, useState } from "react"
import { getAllRaids } from "../Services/RaidService.js"
import { getBossesForRaid } from "../Services/BossService.js"
import { getItemsForBoss } from "../Services/ItemService.js"
import { getAllCharacters } from "../Services/CharacterService.js"

export async function getAllSoftreserves() {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/get/dto", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching players:', error);
        alert('Error fetching players:', error);
        return null; // Or return an empty array or a default value
    }
}


export async function getSoftReservesForBoss(bossId) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/get/dto/forBoss/" + bossId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching players:', error);
        alert('Error fetching players:', error);
        return null; // Or return an empty array or a default value
    }
}

export async function getSoftReservesForRaid(raidId) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/get/dto/forRaid/" + raidId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching softreserves for raid:', error);
        alert('Error fetching softreserves for raid:', error);
        return null; // Or return an empty array or a default value
    }
}


export async function getSoftReservesForCharacter(playerId) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/get/forCharacter/" + playerId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching softreserves for character:', error);
        alert('Error fetching softreserves for character:', error);
        return null; // Or return an empty array or a default value
    }
}

export async function getSoftReservesForCharacterDto(playerId) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/get/dto/forCharacter/" + playerId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data; // Return the parsed JSON data directly
    } catch (error) {
        console.error('Error fetching softreserves for character (DTO):', error);
        alert('Error fetching softreserves (DTO):', error);
        return null; // Or return an empty array or a default value
    }
}

export function ListAllSrs(context) {
    const [bosses, setBosses] = useState([]);
    const [raids, setRaids] = useState([]);
    const [softreserves, setSoftreserves] = useState([]);
    useEffect(() => {
        const fetchRaids = async () => {
            try {
                const data = await getAllRaids();
                setRaids(data);
                try {
                    const bossesData = await getBossesForRaid(data[0].id);
                    setBosses(bossesData);
                    try {
                        const srData = await getSoftReservesForBoss(bossesData[0].id);
                        setSoftreserves(srData);
                    } catch (error) {
                        console.error('Error fetching SRs:', error);
                    }
                } catch (error) {
                    console.error('Error fetching Bosses:', error);
                }
            } catch (error) {
                console.error('Error fetching Raids:', error);
            }
        };
        fetchRaids();
    }, []);

    function getSrText() {
        var itemDict = new Object();
        var maximumAge = new Date().getTime() - (22 * 24 * 60 * 60 * 1000);
        for (const softreserve of softreserves) {
            const itemName = softreserve.item.name
            const charName = softreserve.character.name;
            const bonus = softreserve.bonus;
            if(softreserve.lastupdated < maximumAge) continue;
            if (itemDict[itemName] == null) {
                itemDict[itemName] = charName + " +" + bonus;
            } else {
                itemDict[itemName] += ", " + charName + " +" + bonus;
            }
        }
        
        const sortedKeys = Object.keys(itemDict).sort();
        const sortedItemDict = {};
        for (const key of sortedKeys) {
            sortedItemDict[key] = itemDict[key];
        }

        var alertString = ""
        for (const itemName of Object.keys(sortedItemDict)) {
            alertString += itemName + ": " + sortedItemDict[itemName] + " | \n"
        }
        alert(alertString);
    }
    
    function getSrTextUnrestricted() {
        var itemDict = new Object();
        for (const softreserve of softreserves) {
            const itemName = softreserve.item.name
            const charName = softreserve.character.name;
            const bonus = softreserve.bonus;
            if (itemDict[itemName] == null) {
                itemDict[itemName] = charName + " +" + bonus;
            } else {
                itemDict[itemName] += ", " + charName + " +" + bonus;
            }
        }
        
        const sortedKeys = Object.keys(itemDict).sort();
        const sortedItemDict = {};
        for (const key of sortedKeys) {
            sortedItemDict[key] = itemDict[key];
        }

        var alertString = ""
        for (const itemName of Object.keys(sortedItemDict)) {
            alertString += itemName + ": " + sortedItemDict[itemName] + " | \n"
        }
        alert(alertString);
    }

    function increaseSrBonus(id) {
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/increment/" + id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => {
                    response.json().then(data => {
                        setSoftreserves(prevSoftreserves => prevSoftreserves.map(item => (
                                        item.id === data.id ? data : item
                                        )))
                    })
                });
    }

    function decreaseSrBonus(id) {
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/decrease/" + id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => {
                    response.json().then(data => {
                        setSoftreserves(prevSoftreserves => prevSoftreserves.map(item => (
                                        item.id === data.id ? data : item
                                        )))
                    })
                });
    }

    function updateRaidSelection(context) {
        const raid = JSON.parse(context.target.value);
        console.log(raid);
        const fetchBosses = async () => {
            try {
                const data = await getBossesForRaid(raid.id);
                setBosses(data);
            } catch (error) {
                console.error('Error fetching Bosses:', error);
            }
        };
        fetchBosses();
        const fetchSrs = async () => {
            try {
                const data = await getSoftReservesForRaid(raid.id);
                console.log(data);
                setSoftreserves(data);
            } catch (error){
                console.error('Error fetching Srs for selected Raid:', error);
            }
        }
        fetchSrs();
    }

    function updateBossSelection(context) {
        const boss = JSON.parse(context.target.value);
        console.log(boss);
        const fetchSoftreserves = async () => {
            try {
                const data = await getSoftReservesForBoss(boss.id);
                setSoftreserves(data);
            } catch (error) {
                console.error('Error fetching Srs for Boss:', error);
            }
        };
        fetchSoftreserves();
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>List of all Softreserves:</h2>
                <div>
                    <select name="raidInput" className="textMedium" onChange = {updateRaidSelection}>
                        {raids.map(raid => (
                                        <option key={raid.id} value={JSON.stringify(raid)}>{raid.name}</option>
                                                ))}
                    </select>
                    <select name="bossInput" className="textMedium" onChange = {updateBossSelection}>
                        {bosses.length > 0 && bosses.map(boss => (
                                <option key={boss.id} value={JSON.stringify(boss)}>{boss.name}</option>
                                        ))}
                    </select>
                    <button className = "btn btn-secondary" onClick={() => getSrText()}>Get SR Text</button>
                </div>
                <div>
                    <button className = "btn btn-secondary" onClick={() => getSrTextUnrestricted()}>Get FULL SR Text</button>
                </div>
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Character</th>
                            <th>Raid</th>
                            <th>Boss(es)</th>
                            <th>Item</th>
                            <th>Bonus</th>
                            <th>Last Updated On</th>
                            <th>Actions</th>
                        </tr>
                        {softreserves.length > 0 && (
                                    softreserves.map((sr) => (
                                        <tr key = {sr.id}>
                                            <td>{sr.id}</td>
                                            <td>{sr.character.name}</td>
                                            <td>{sr.raid.name}</td>
                                            <td>{sr.bosses}</td>
                                            <td>{sr.item.name}</td>
                                            <td>{sr.bonus}</td>
                                            <td>{new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(sr.lastupdated)}</td>
                                            <td>
                                                <button className = "btn btn-success" onClick={() => increaseSrBonus(sr.id)}>+</button>
                                                <button className = "btn btn-danger" onClick={() => decreaseSrBonus(sr.id)}>-</button>
                                            </td>
                                        </tr>
                                                ))
                                    )}
                    </tbody>
                </table>
            </div>
            );
}

export function CreateSrForm(context) {
    const [raidId, setRaidId] = useState(null);
    const [bossId, setBossId] = useState(null);
    const [itemId, setItemId] = useState(null);
    const [characterId, setCharacterId] = useState(null);

    const [bosses, setBosses] = useState([]);
    const [raids, setRaids] = useState([]);
    const [items, setItems] = useState([]);
    const [characters, setCharacters] = useState([]);

    function updateRaidSelection(context) {
        const raid = JSON.parse(context.target.value);
        console.log(raid);
        setRaidId(raid.id);
        const fetchBosses = async () => {
            try {
                const data = await getBossesForRaid(raid.id);
                setBosses(data);
                setBossId(bosses[0].id);
            } catch (error) {
                console.error('Error fetching Bosses:', error);
            }
        };
        fetchBosses();
    }

    function updateBossSelection(context) {
        const boss = JSON.parse(context.target.value);
        console.log(boss);
        setBossId(boss.id);
        const fetchItems = async () => {
            try {
                const data = await getItemsForBoss(boss.id);
                setItems(data);
            } catch (error) {
                console.error('Error fetching Bosses:', error);
            }
        };
        fetchItems();
    }

//init
    useEffect(() => {
        const fetchRaids = async () => {
            try {
                const data = await getAllRaids();
                setRaids(data);
                setRaidId(data[0].id);
                try {
                    const bossesData = await getBossesForRaid(data[0].id);
                    setBosses(bossesData);
                    setBossId(bossesData[0].id);
                    try {
                        const data = await getItemsForBoss(bossesData[0].id);
                        setItems(data);
                    } catch (error) {
                        console.error('Error fetching Bosses:', error);
                    }
                } catch (error) {
                    console.error('Error fetching Bosses:', error);
                }
            } catch (error) {
                console.error('Error fetching Softreserves:', error);
            }
        };
        fetchRaids();
    }, []);
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getAllCharacters();
                setCharacters(data);
                setCharacterId(data[0].id);
            } catch (error) {
                console.error('Error fetching Softreserves:', error);
            }
        };
        fetchCharacters();
    }, []);
    function addSoftreserve(event) {
        event.preventDefault();
        const raid = JSON.parse(event.target.raidInput.value);
        const boss = JSON.parse(event.target.bossInput.value);
        const item = JSON.parse(event.target.itemInput.value);
        const character = JSON.parse(event.target.characterInput.value);
        const softreserve = {
            "character": character,
            "item": item,
            "raid": raid,
            "bonus": 0,
            "lastupdated": Date.now()
        }
        console.log(softreserve);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/create", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(softreserve)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Create Softreserve:</h2>
                <form onSubmit = {addSoftreserve} >
                    <div className="form-group">
                        <p className="textSmall">Raid:</p>
                        <select name="raidInput" className="textMedium" onChange = {updateRaidSelection}>
                            {raids.map(raid => (
                                        <option key={raid.id} value={JSON.stringify(raid)}>{raid.name}</option>
                                                    ))}
                        </select>
                        <p className="textSmall">Boss:</p>
                        <select name="bossInput" className="textMedium" onChange = {updateBossSelection}>
                            {bosses.length > 0 && bosses.map(boss => (
                                <option key={boss.id} value={JSON.stringify(boss)}>{boss.name}</option>
                                            ))}
                        </select>
                        <p className="textSmall">Item:</p>
                        <select name="itemInput" className="textMedium w-75" onChange={e => setItemId(JSON.parse(e.target.value).id)}>
                            {items.length > 0 && items.map(item => (
                                <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                                            ))}
                        </select>
                        <p className="textSmall">Character:</p>
                        <div className="d-flex align-items-center justify-content-center" onChange={e => setCharacterId(JSON.parse(e.target.value).id)}>
                            <select name="characterInput" className="textMedium">
                                {characters.length > 0 && characters.map(character => (
                                <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                                ))}
                            </select>
                            <button type ="submit" className = "btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}



export function DeleteSrForm(context) {
    const [characters, setCharacters] = useState([]);
    const [srs, setSrs] = useState([]);

    function updateCharacterSelection(context) {
        const character = JSON.parse(context.target.value);
        console.log(character);
        const fetchSrs = async () => {
            try {
                const data = await getSoftReservesForCharacter(character.id);
                console.log(data);
                setSrs(data);
            } catch (error) {
                console.error('Error fetching SRS for player:', error);
            }
        };
        fetchSrs();
    }

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getAllCharacters();
                setCharacters(data);
                try {
                    const srData = await getSoftReservesForCharacter(data[0].id);
                    console.log(srData);
                    setSrs(srData);
                } catch (error) {
                    console.error('Error fetching SRS for player:', error);
                }
            } catch (error) {
                console.error('Error fetching Softreserves:', error);
            }
        };
        fetchCharacters();
    }, []);

    function deleteSoftreserve(event) {
        event.preventDefault();
        const sr = JSON.parse(event.target.srInput.value);
        console.log(sr);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/delete", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sr)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Delete Softreserve:</h2>
                <form onSubmit = {deleteSoftreserve} >
                    <div className="form-group">
                        <p className="textSmall">Character:</p>
                        <div className="d-flex align-items-center justify-content-center" onChange={updateCharacterSelection}>
                            <select name="characterInput" className="textMedium">
                                {characters.length > 0 && characters.map(character => (
                                        <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                                        ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <p className="textSmall">SR:</p>
                        <div className="d-flex align-items-center justify-content-center">
                            <select name="srInput" className="textMedium w-75">
                                {srs.length > 0 && srs.map(sr => (
                                <option key={sr.id} value={JSON.stringify(sr)}>{sr.raid.name}: {sr.item.name} +{sr.bonus}</option>
                                                ))}
                            </select>
                            <button type ="submit" className = "btn btn-danger" disabled={srs.length == 0}>Delete</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}


export function ViewSrsPerCharacter(context) {
    const [characters, setCharacters] = useState([]);
    const [srs, setSrs] = useState([]);

    function updateCharacterSelection(context) {
        const character = JSON.parse(context.target.value);
        console.log(character);
        const fetchSrs = async () => {
            try {
                const data = await getSoftReservesForCharacterDto(character.id);
                console.log(data);
                setSrs(data);
            } catch (error) {
                console.error('Error fetching SRS for player:', error);
            }
        };
        fetchSrs();
    }
    
    function increaseSrBonus(id) {
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/increment/" + id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => {
                    response.json().then(data => {
                        setSrs(prevSoftreserves => prevSoftreserves.map(item => (
                                        item.id === data.id ? data : item
                                        )))
                    })
                });
    }

    function decreaseSrBonus(id) {
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/decrease/" + id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => {
                    response.json().then(data => {
                        setSrs(prevSoftreserves => prevSoftreserves.map(item => (
                                        item.id === data.id ? data : item
                                        )))
                    })
                });
    }

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getAllCharacters();
                setCharacters(data);
                try {
                    const srData = await getSoftReservesForCharacter(data[0].id);
                    console.log(srData);
                    setSrs(srData);
                } catch (error) {
                    console.error('Error fetching SRS for player:', error);
                }
            } catch (error) {
                console.error('Error fetching Softreserves:', error);
            }
        };
        fetchCharacters();
    }, []);

    function deleteSoftreserve(event) {
        event.preventDefault();
        const sr = JSON.parse(event.target.srInput.value);
        console.log(sr);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/softreserve/delete", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sr)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>View SRs for Characters:</h2>
                <div className="form-group">
                    <p className="textSmall">Character:</p>
                    <div className="d-flex align-items-center justify-content-center" onChange={updateCharacterSelection}>
                        <select name="characterInput" className="textMedium">
                            {characters.length > 0 && characters.map(character => (
                                        <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                                    ))}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Raid</th>
                            <th>Boss(es)</th>
                            <th>Item</th>
                            <th>Bonus</th>
                            <th>Last Updated On</th>
                            <th>Actions</th>
                        </tr>
                        {srs.length > 0 && (
                                    srs.map((sr) => (
                                        <tr key = {sr.id}>
                                            <td>{sr.id}</td>
                                            <td>{sr.raid.name}</td>
                                            <td>{sr.bosses}</td>
                                            <td>{sr.item.name}</td>
                                            <td>{sr.bonus}</td>
                                            <td>{new Intl.DateTimeFormat('de-DE', {year: 'numeric', month: '2-digit', day: '2-digit'}).format(sr.lastupdated)}</td>
                                            <td>
                                                <button className = "btn btn-success" onClick={() => increaseSrBonus(sr.id)}>+</button>
                                                <button className = "btn btn-danger" onClick={() => decreaseSrBonus(sr.id)}>-</button>
                                            </td>
                                        </tr>
                                                ))
                                    )}
                    </tbody>
                </table>
                </div>
            </div>
            );
}