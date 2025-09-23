import {apiUrl} from "../config";
import { useEffect, useState } from "react"
import {getAllRaidrewards} from "../Services/RaidrewardService.js";
import {getAllCharacters} from "../Services/CharacterService.js";

export function RewardPlayersForm(context){
    const [raidRewards, setRaidRewards] = useState([]);
    
    const [selectedRaidReward, setSelectedRaidReward] = useState(null);
    
    useEffect(() => {
        const fetchRaidrewards = async () => {
            try {
                const data = await getAllRaidrewards();
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
        const rows = inputText.split("\n");
        var playerNames = [];
        let counter = 0;
        for(const row of rows){
            let characterNames = row.split(", ");
            if(characterNames[0] == ""){
                console.log("empty row");
                continue;
            }
            playerNames[counter] = characterNames;
            counter++;
        }
        fetch(apiUrl+"/api/player/rewardMultiple/" + selectedRaidReward.id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
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
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Reward players:</h2>
                <form onSubmit = {rewardPlayers}>
                    <div className="form-group">
                        <p className="textSmall">Raid:</p>
                        <select name="raidRewardInput" className="textMedium" onChange = {updateRaidRewardSelection}>
                            {raidRewards.map(raidReward => (
                                        <option key={raidReward.id} value={JSON.stringify(raidReward)}>{raidReward.id}: {raidReward.raid.name} - {raidReward.rewardType} {raidReward.rewardValue} </option>
                                                    ))}
                        </select>
                        <textarea name="charactersInput" className="textSmall" autoCorrect="off" rows="20" cols="40"/>
                        <br/>
                        <button type ="submit" className = "btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            );
}


export function GpAwardForm(context){
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getAllCharacters();
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
        fetch(apiUrl+"/api/player/awardGp/" + selectedCharacter.id, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
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
    
    return (
            <div className="border border-secondary border-2 rounded p-2">
                <h2>Award GP for character:</h2>
                <form onSubmit={awardGp}>
                    <div className="form-group d-flex align-items-center justify-content-center">
                        <p className="textSmall my-auto">Character:</p>
                        <select name="characterInput" className="textMedium my-auto" onChange = {updateCharacterSelection}>
                            {characters.map(character => (
                                        <option key={character.id} value={JSON.stringify(character)}>{character.name}</option>
                                                    ))}
                        </select>
                        <select name="GpValueInput" className="textMedium my-auto">
                            <option value="1">LOW</option>
                            <option value="2">MID</option>
                            <option value="3">HIGH</option>
                        </select>
                        <button type ="submit" className = "btn btn-primary my-auto">Submit</button>
                    </div>
                </form>
            </div>
            );
}

export function PartitionPlayerRewardsForm(context){
    function applyWeeklyDecay(event){
        event.preventDefault();
        if( window.confirm("Are you sure you want to apply the weekly decay?") === false ){
            return;
        }
        fetch(apiUrl+"/api/player/applyWeeklyDecay", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => console.log(response));
    }
    return (
            <div className="border border-secondary border-2 rounded p-2">
                <form onSubmit={applyWeeklyDecay}>
                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button type ="submit" className = "btn btn-danger my-auto">Apply Weekly Decay</button>
                    </div>
                </form>
            </div>
            );
}

export function ApplyWeeklyDecayForm(context){
    
    function applyWeeklyDecay(event){
        event.preventDefault();
        if( window.confirm("Are you sure you want to apply the weekly decay?") === false ){
            return;
        }
        fetch(apiUrl+"/api/player/applyWeeklyDecay", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
                .then(response => console.log(response));
    }
    return (
            <div className="border border-secondary border-2 rounded p-2">
                <form onSubmit={applyWeeklyDecay}>
                    <div className="form-group d-flex align-items-center justify-content-center">
                        <button type ="submit" className = "btn btn-danger my-auto">Apply Weekly Decay</button>
                    </div>
                </form>
            </div>
            );
}
