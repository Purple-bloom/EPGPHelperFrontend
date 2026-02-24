import { useEffect, useState } from "react"

async function getAllLogs() {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/log/getAll", {
            method: 'GET',
            headers: {
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

async function getRecentLogs() {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/log/getRecent", {
            method: 'GET',
            headers: {
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
    
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getAllLogs();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchLogs();
    }, []);
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

export function ListRecentLogs(context) {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getRecentLogs();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };
        fetchLogs();
    }, []);
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