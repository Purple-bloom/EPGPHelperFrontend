import { useEffect, useState } from "react"
import {getAllRaidrewards} from "../Services/RaidrewardService.js";
import {getAllCharacters} from "../Services/CharacterService.js";

export function GpAwardForm({token}){
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [selectedCharacterOffspec, setSelectedCharacterOffspec] = useState(null);
    
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getAllCharacters(token);
                setCharacters(data);
                if(data != null){
                    setSelectedCharacter(data[0]);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchCharacters();
    }, []);
    
    function awardGp(event){
        event.preventDefault();
        console.log(selectedCharacter.id);
        console.log(event.target.GpValueInput.value);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/awardGp/" + selectedCharacter.id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: event.target.GpValueInput.value
        })
                .then(response => response.text().then(data => {
                    alert(JSON.stringify(data));
                    window.location.reload();

                }));
    }

    function awardGpOffspec(event){
        event.preventDefault();
        console.log(selectedCharacterOffspec.id);
        console.log(event.target.GpValueInput.value);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/awardGpOffspec/" + selectedCharacterOffspec.id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: event.target.GpValueInput.value
        })
                .then(response => response.text().then(data => {
                    alert(JSON.stringify(data));
                    window.location.reload();

                }));
    }
    
    function updateCharacterSelection(event){
        const character = JSON.parse(event.target.value);
        console.log(character);
        setSelectedCharacter(character);
    }

    function updateCharacterSelectionOffspec(event){
        const character = JSON.parse(event.target.value);
        console.log(character);
        setSelectedCharacterOffspec(character);
    }
    
    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Award GP for character:</h2>
                <form onSubmit={awardGp}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Character:</label>
                            <div className="col-sm-8">
                                <select name="characterInput" className="form-select textMedium" onChange={updateCharacterSelection}>
                                    {characters.map(character => (
                                        <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">GP Value:</label>
                            <div className="col-sm-8">
                                <select name="GpValueInput" className="form-select textMedium">
                                    <option value="1">LOW</option>
                                    <option value="2">MID</option>
                                    <option value="3">HIGH</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </form>

                <h2 className="mb-3 mt-4">Award GP for character (offspec discount):</h2>
                <form onSubmit={awardGpOffspec}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Character:</label>
                            <div className="col-sm-8">
                                <select name="characterInput" className="form-select textMedium" onChange={updateCharacterSelectionOffspec}>
                                    {characters.map(character => (
                                        <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">GP Value:</label>
                            <div className="col-sm-8">
                                <select name="GpValueInput" className="form-select textMedium">
                                    <option value="1">LOW</option>
                                    <option value="2">MID</option>
                                    <option value="3">HIGH</option>
                                </select>
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

export function ApplyWeeklyDecayForm({token}){

    function applyWeeklyDecay(event){
        event.preventDefault();
        if( window.confirm("Are you sure you want to apply the weekly decay?") === false ){
            return;
        }
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/applyWeeklyDecay", {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
                .then(response => console.log(response));
    }
    return (
            <div className="border border-secondary border-2 rounded p-3">
                <form onSubmit={applyWeeklyDecay}>
                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button type="submit" className="btn btn-danger">Apply Weekly Decay</button>
                    </div>
                </form>
            </div>
            );
}

export function RewardPlayersForm({token}){
    const [raidRewards, setRaidRewards] = useState([]);
    const [selectedRaidReward, setSelectedRaidReward] = useState(null);

    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards(token);
                setRaidRewards(data);
                if(data != null){
                    setSelectedRaidReward(data[0]);
                }
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchRaidrewards();
    }, []);

    function rewardPlayers(event){
        event.preventDefault();
        if( window.confirm("Are you sure you want to award the players " + selectedRaidReward.rewardValue + " points?") === false ){
            return;
        }
        const inputText = event.target.charactersInput.value;
        const playerNames = inputText
            .split(/[\n,]+/)
            .map(name => name.trim())
            .filter(Boolean);
        fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/rewardMultiple/" + selectedRaidReward.id, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playerNames)
        })
                .then(response => response.text().then(text => alert(text)));
    }

    function updateRaidRewardSelection(event){
        const raidReward = JSON.parse(event.target.value);
        console.log(raidReward);
        setSelectedRaidReward(raidReward);
    }

    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Reward players:</h2>
                <form onSubmit={rewardPlayers}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Raid:</label>
                            <div className="col-sm-8">
                                <select name="raidRewardInput" className="form-select textMedium" onChange={updateRaidRewardSelection}>
                                    {raidRewards.map(raidReward => (
                                        <option key={raidReward.id} value={JSON.stringify(raidReward)}>
                                            {raidReward.id}: {raidReward.raid.name} - {raidReward.rewardType} {raidReward.rewardValue}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row align-items-start">
                            <label className="col-sm-4 text-end textSmall mb-0 pt-2">Characters:</label>
                            <div className="col-sm-8">
                                <textarea name="charactersInput" className="form-control textSmall" autoCorrect="off" rows="10" />
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

export function PartitionPlayerRewardsForm(){
    function calculatePartitions(event){
        event.preventDefault();
        let characters = event.target.charactersInput.value.split(String.fromCharCode(10));
        let partitions = event.target.numberOfPartitionsInput.value
        console.log(characters);
        console.log(partitions);
        let charMap = new Map();
        if(partitions == null || partitions <= 0 || partitions > 20){
            alert("Nah not doing that - invalid value for partition amount (MIN: 1, MAX: 10)");
            return;
        }
        for(let characterLine of characters){
            characterLine = characterLine.toLowerCase();
            if (characterLine.split(":").length == 1 || characterLine.split(":").length >= 3 ){
                alert("Nah not doing that --- " + characterLine + " --- needs to have exactly one : and it has " + characterLine.split(":").length);
                return;
            }
            characterLine = characterLine.split(":")[1];
            let characterNames = characterLine.trim().split(",");
            for(let characterName of characterNames){
                characterName = characterName.trim().toLowerCase();
                if(charMap.get(characterName) == null){
                    charMap.set(characterName, 1)
                } else {
                    charMap.set(characterName, charMap.get(characterName) + 1)
                }
            }
        }
        console.log(charMap)
        let out = "";
        for(let keyValuePair of charMap){
            let charName = keyValuePair[0];
            let appearances = keyValuePair[1];
            if(appearances >= partitions){
                appearances = partitions
            }
            for(let i = 0; i<appearances; i++){
                out+=charName+", "
            }
        }
        out = out.substring(0, out.length -2);
        alert(out);
    }
    return (
            <div className="border border-secondary border-2 rounded p-3">
                <h2 className="mb-3">Partitioner:</h2>
                <form onSubmit={calculatePartitions}>
                    <div className="form-group d-flex flex-column gap-2">
                        <div className="row align-items-center">
                            <label className="col-sm-4 text-end textSmall mb-0">Partitions:</label>
                            <div className="col-sm-8">
                                <input name="numberOfPartitionsInput" className="form-control textMedium" />
                            </div>
                        </div>
                        <div className="row align-items-start">
                            <label className="col-sm-4 text-end textSmall mb-0 pt-2">Characters:</label>
                            <div className="col-sm-8">
                                <textarea name="charactersInput" className="form-control textSmall" autoCorrect="off" rows="10" />
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