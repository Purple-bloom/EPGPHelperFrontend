import { useEffect, useState } from "react"
import { getAllRaids } from "../Services/RaidService.js"

export function ListAllRaidrewards({token}) {
    const [raidrewards, setRaidrewards] = useState([]);
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards(token);
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

export function CreateRaidrewardForm({token}) {
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
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raidreward)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Create new Raidreward:</h2>
                <form action={addRaidreward}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Raid:</label>
                            <div className="col-sm-8">
                                <select name="raidInput" className="form-select textMedium" onChange={updateRaidSelection}>
                                    {raids.map(raid => (
                                        <option key={raid.id} value={JSON.stringify(raid)}>{raid.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Rewardtype:</label>
                            <div className="col-sm-8">
                                <input name="rewardTypeInput" className="form-control textMedium" />
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Rewardvalue:</label>
                            <div className="col-sm-8">
                                <input name="rewardValueInput" className="form-control textMedium" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export function UpdateRaidrewardForm({token}) {
    const [raidrewards, setRaidrewards] = useState([]);
    const [selectedRaidreward, setSelectedRaidreward] = useState([]);
    
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards(token);
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
'Authorization': token,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raidreward)
        })
                .then(response => console.log(response));
    }

    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Update Raidreward:</h2>
                <form action={updateRaidreward}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Raid:</label>
                            <div className="col-sm-8">
                                <select name="raidrewardInput" className="form-select textMedium" onChange={updateRaidrewardSelection}>
                                    {raidrewards.map(raidreward => (
                                        <option key={raidreward.id} value={JSON.stringify(raidreward)}>
                                            {raidreward.id}: {raidreward.raid.name} - {raidreward.rewardType} {raidreward.rewardValue}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Rewardtype:</label>
                            <div className="col-sm-8">
                                <input
                                    name="rewardTypeInput"
                                    className="form-control textMedium"
                                    value={selectedRaidreward.rewardType || ''}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Rewardvalue:</label>
                            <div className="col-sm-8">
                                <input name="rewardValueInput" className="form-control textMedium" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export function DeleteRaidrewardForm({token}) {
    const [raidrewards, setRaidrewards] = useState([]);
    const [selectedRaidreward, setSelectedRaidreward] = useState([]);
    
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards(token);
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
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedRaidreward)
        })
                .then(response => response.text().then(text => alert(text)));
    }

    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Delete Raidreward:</h2>
                <form action={deleteRaidreward}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Raid:</label>
                            <div className="col-sm-8">
                                <select name="raidrewardInput" className="form-select textMedium" onChange={updateRaidrewardSelection}>
                                    {raidrewards.map(raidreward => (
                                        <option key={raidreward.id} value={JSON.stringify(raidreward)}>
                                            {raidreward.id}: {raidreward.raid.name} - {raidreward.rewardType} {raidreward.rewardValue}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
            );
}

export function CreateRaidForm({ token }) {
    function addRaid(formdata) {
        const raidName = formdata.get("raidNameInput");
        if (!raidName || raidName.trim() === "") {
            alert("Please enter a valid raid name.");
            return;
        }

        const raid = {
            id: null,
            name: raidName
        };

        fetch(process.env.REACT_APP_BACKEND_URL + "/api/raid/create", {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raid)
        })
        .then(response => {
            if (response.ok) {
                alert("Raid created successfully!");
            } else {
                alert("Failed to create raid.");
            }
        })
        .catch(error => console.error('Error creating raid:', error));
    }

    return (
        <div className="border border-secondary border-2 rounded p-3">
            <h2 className="mb-3">Create new Raid:</h2>
            <form action={addRaid}>
                <div className="form-group d-flex flex-column gap-2">
                    <div className="row align-items-center">
                        <label className="col-sm-4 text-end textSmall mb-0">Raid Name:</label>
                        <div className="col-sm-8">
                            <input name="raidNameInput" className="form-control textMedium" required />
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export function DeleteRaidForm({ token }) {
    const [raids, setRaids] = useState([]);
    const [selectedRaid, setSelectedRaid] = useState(null);

    useEffect(() => {
        const fetchRaids = async () => {
            try {
                const data = await getAllRaids(token);
                setRaids(data);
                if (data && data.length > 0) {
                    setSelectedRaid(data[0]);
                }
            } catch (error) {
                console.error('Error fetching raids:', error);
            }
        };
        fetchRaids();
    }, [token]);

    function updateRaidSelection(context) {
        const raid = JSON.parse(context.target.value);
        setSelectedRaid(raid);
    }

    function deleteRaid() {
        if (!selectedRaid) {
            alert("No raid selected.");
            return;
        }

        if (window.confirm("Are you sure you want to delete the raid: " + selectedRaid.name + "?") === false) {
            return;
        }

        fetch(process.env.REACT_APP_BACKEND_URL + "/api/raid/" + selectedRaid.id, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 204) {
                alert("Raid deleted successfully!");
            } else if (response.status === 404) {
                alert("Raid not found.");
            } else {
                alert("Failed to delete raid.");
            }
        })
        .catch(error => console.error('Error deleting raid:', error));
    }

    return (
        <div className="border border-secondary border-2 rounded p-3">
            <h2 className="mb-3">Delete Raid:</h2>
            <form action={deleteRaid}>
                <div className="form-group d-flex flex-column gap-2">
                    <div className="row align-items-center">
                        <label className="col-sm-4 text-end textSmall mb-0">Raid:</label>
                        <div className="col-sm-8">
                            <select name="raidInput" className="form-select textMedium" onChange={updateRaidSelection}>
                                {raids.map(raid => (
                                    <option key={raid.id} value={JSON.stringify(raid)}>
                                        {raid.id}: {raid.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        <button type="submit" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </form>
        </div>
    );
}


export async function getAllRaidrewards(token)
{
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/raidreward/get", {
            method: 'GET',
            headers: {
                'Authorization': token,
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