import {apiUrl} from "../config";

export async function getItemsForBoss(bossId){
    try {
        const response = await fetch(apiUrl+"/api/item/get/forBoss/"+bossId, {
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
