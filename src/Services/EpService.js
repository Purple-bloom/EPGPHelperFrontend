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
                    </div>
                    <textarea name="charactersInput" className="textSmall" autoCorrect="off" rows="20" cols="30"/>
                    <br/>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
            );
}

export function PartitionPlayerRewardsForm(context){
    function calculatePartitions(event){
        event.preventDefault();
        let characters = event.target.charactersInput.value.split(String.fromCharCode(10));
        let partitions = event.target.numberOfPartitionsInput.value
        console.log(characters);
        console.log(partitions);
        let charMap = new Map();
        if(partitions == null || partitions <= 0 || partitions > 10){
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
            <div className="border border-secondary border-2 rounded p-2">
                <h1>Partitioner</h1>
                <form onSubmit={calculatePartitions}>
                    <div className="form-group d-flex align-items-center justify-content-center textMedium">
                        <p>Number of Partitions: </p>
                        <input name="numberOfPartitionsInput"/>
                    </div>
                    <textarea name="charactersInput" className="textSmall" autoCorrect="off" rows="20" cols="30"/>
                    <br/>
                    <button type ="submit" className = "btn btn-primary">Submit</button>
                </form>
            </div>
            );
}
