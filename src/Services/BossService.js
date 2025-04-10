import {apiUrl} from "../config";

export async function getBossesForRaid(raidId){
    try {
        const response = await fetch(apiUrl+"/api/boss/get/forRaid/" + raidId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin:': '*'
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

export async function getAllBosses() {
    try {
        const response = await fetch(apiUrl+"/api/boss/get", {
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
        return data; // Return the parsed JSON data directly
     } catch (error) {
    console.error('Error fetching players:', error);
    alert('Error fetching players:', error);
    return null; // Or return an empty array or a default value
  }
}