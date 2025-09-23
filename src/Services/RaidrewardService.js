import { useEffect, useState } from "react"
import { getAllRaids } from "../Services/RaidService.js"

export function ListAllRaidrewards(context) {
    const [raidrewards, setRaidrewards] = useState([]);
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards();
                setRaidrewards(data);
            } catch (error) {
                console.error('Error fetching Raidrewards:', error);
            }
        };
        fetchRaidrewards();
    }, []);

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>List of all raidrewards:</h2>
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Raid
                            </th>
                            <th>
                                Reward type
                            </th>
                            <th>
                                Reward Value
                            </th>
                        </tr>
                        {raidrewards.length > 0 && (
                                            raidrewards.map((raidreward) => (
                                                <tr key = {raidreward.id}>
                                                    <td>{raidreward.id}</td>
                                                    <td>{raidreward.raid.name}</td>
                                                    <td>{raidreward.rewardType}</td>
                                                    <td>{raidreward.rewardValue}</td>
                                                </tr>
                                                        ))
                                            )}
                    </tbody>
                </table>
            </div>
            );
}

export function CreateRaidrewardForm(context) {
    const [raids, setRaids] = useState([]);
    const [selectedRaid, setSelectedRaid] = useState(null);
    
    useEffect(() => {
        const fetchRaidRewards = async () => {
            try {
                const data = await getAllRaids();
                setRaids(data);
                if(data[0] != null){
                    setSelectedRaid(data[0]);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchRaidRewards();
    }, []);
    
    function updateRaidSelection(context) {
        const raid = JSON.parse(context.target.value);
        console.log(raid);
        setSelectedRaid(raid);
    }
    
    function addRaidreward(formdata){
        const raidreward = {
            "id": null,
            "raid": selectedRaid,
            "rewardType": formdata.get("rewardTypeInput"),
            "rewardValue": formdata.get("rewardValueInput")
        }
        console.log(raidreward);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/raidreward/create", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raidreward)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Create new Raidreward:</h2>
                <form action = {addRaidreward} >
                    <div className="form-group">
                        <p className="textSmall">Raid:</p>
                        <select name="raidInput" className="textMedium" onChange = {updateRaidSelection}>
                            {raids.map(raid => (
                                        <option key={raid.id} value={JSON.stringify(raid)}>{raid.name}</option>
                                                    ))}
                        </select>
                        <div>
                            <p className="textSmall">Rewardtype:</p>
                            <input name = "rewardTypeInput" className="textMedium"/>
                        </div>
                        <div>
                            <p className="textSmall">Rewardvalue:</p>
                            <input name = "rewardValueInput" className="textMedium"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type ="submit" className = "btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export function UpdateRaidrewardForm(context) {
    const [raidrewards, setRaidrewards] = useState([]);
    const [selectedRaidreward, setSelectedRaidreward] = useState([]);
    
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards();
                setRaidrewards(data);
                if(data[0] != null){
                    setSelectedRaidreward(data[0]);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchRaidrewards();
    }, []);
    
    function updateRaidrewardSelection(context) {
        const raidreward = JSON.parse(context.target.value);
        console.log(raidreward);
        setSelectedRaidreward(raidreward);
    }
    
    function updateRaidreward(formdata){
        const raidreward = {
            "id": selectedRaidreward.id,
            "raid": selectedRaidreward.raid,
            "rewardType": selectedRaidreward.rewardType,
            "rewardValue": formdata.get("rewardValueInput")
        }
        console.log(raidreward);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/raidreward/update", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raidreward)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Update Raidreward:</h2>
                <form action = {updateRaidreward} >
                    <div className="form-group">
                        <p className="textSmall">Raid:</p>
                        <select name="raidrewardInput" className="textMedium" onChange = {updateRaidrewardSelection}>
                            {raidrewards.map(raidreward => (
                                        <option key={raidreward.id} value={JSON.stringify(raidreward)}>{raidreward.id}: {raidreward.raid.name} - {raidreward.rewardType} {raidreward.rewardValue}</option>
                                                    ))}
                        </select>
                        <div>
                            <p className="textSmall">Rewardtype:</p>
                            <input name = "rewardTypeInput" className="textMedium" value={selectedRaidreward.rewardType} disabled/>
                        </div>
                        <div>
                            <p className="textSmall">Rewardvalue:</p>
                            <input name = "rewardValueInput" className="textMedium"/>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type ="submit" className = "btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export function DeleteRaidrewardForm(context) {
    const [raidrewards, setRaidrewards] = useState([]);
    const [selectedRaidreward, setSelectedRaidreward] = useState([]);
    
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards();
                setRaidrewards(data);
                if(data[0] != null){
                    setSelectedRaidreward(data[0]);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchRaidrewards();
    }, []);
    
    function updateRaidrewardSelection(context) {
        const raidreward = JSON.parse(context.target.value);
        console.log(raidreward);
        setSelectedRaidreward(raidreward);
    }
    
    function deleteRaidreward(formdata){
        if( window.confirm("Are you sure you want to delete the raidreward " + selectedRaidreward.raid.name + " - " + selectedRaidreward.rewardType + ": " + selectedRaidreward.rewardValue + "?") === false ){
            return;
        }
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/raidreward/delete", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedRaidreward)
        })
                .then(response => response.text().then(text => alert(text)));
    }

    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Delete Raidreward:</h2>
                <form action = {deleteRaidreward} >
                    <div className="form-group">
                        <p className="textSmall">Raid:</p>
                        <select name="raidrewardInput" className="textMedium" onChange = {updateRaidrewardSelection}>
                            {raidrewards.map(raidreward => (
                                        <option key={raidreward.id} value={JSON.stringify(raidreward)}>{raidreward.id}: {raidreward.raid.name} - {raidreward.rewardType} {raidreward.rewardValue}</option>
                                                    ))}
                        </select>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type ="submit" className = "btn btn-danger">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export async function getAllRaidrewards()
{
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/raidreward/get", {
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
        data.sort((a, b) => {
            if(a.raid.name > b.raid.name){
                return true;
            } else if (a.raid.name < b.raid.name) {
                return false;
            } else if (a.rewardType > b.rewardType){
                return true;
            } else {
                return false;
            }
        })
        return data;
    } catch (error) {
        console.error('Error fetching raidrewards:', error);
        alert('Error fetching raidrewards:', error);
        return null;
    }
}