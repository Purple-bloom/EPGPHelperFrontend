import {apiUrl} from "../config";
import { useEffect, useState } from "react"

async function getAllLogs() {
    try {
        const response = await fetch(apiUrl+"/api/log/getAll", {
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
        data.sort((a, b) => a.time < b.time)
        return data; // Return the parsed JSON data directly
     } catch (error) {
    console.error('Error fetching logs:', error);
    alert('Error fetching logs:', error);
    return null; // Or return an empty array or a default value
  }
}

export function ListAllLogs(context) {
    const [logs, setLogs] = useState([]);
    getAllLogs().then((logArray) => {
            setLogs(logArray);
        });
    return (
            <div className="border border-secondary border-2 rounded p-2">
                <table className = "table table-dark">
                    <tbody>
                        <tr>
                            <th>id</th>
                            <th>timestamp</th>
                            <th>message</th>
                        </tr>
                        {logs.length > 0 && (
                                    logs.map((log) => (
                                        <tr key = {log.id}>
                                            <td>{log.id}</td>
                                            <td>{new Date(log.time).toISOString()}</td>
                                            <td>{log.message}</td>
                                        </tr>
                                                ))
                                    )}
                    </tbody>
                </table>
            </div>
            );
}