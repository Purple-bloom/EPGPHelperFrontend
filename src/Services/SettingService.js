import { useEffect, useState } from "react"


export function SettingsInterface(){
    const [settings, setSettings] = useState([]);
    useEffect(() => {
            const fetchSettings = async () => {
                try {
                    const data = await getAllSettings();
                    setSettings(data);
                } catch (error) {
                    console.error('Error fetching Settings: ' + error);
                }
            };
            fetchSettings();
        }, []);

    function editSetting(formdata) {
            const setting = {
                "settingName": formdata.get("settingNameInput"),
                "settingValue": formdata.get("settingValueInput"),
            }
            console.log(setting)

            fetch(process.env.REACT_APP_BACKEND_URL+"/api/player/changeSetting", {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setting)
            })
                    .then(response => {
                        response.text().then(data => {
                            alert(JSON.stringify(data));
                            window.location.reload();
                        })
                    });
        }
    return (
            <div className="border border-secondary border-2 rounded p-2">
            {settings.length > 0 && (
                    settings.map(
                    (setting) => (
                        <form action = {editSetting} className="border border-secondary border-2 rounded p-2">
                            <input name="settingNameInput" class="textBig text-warning w-25" value={setting.settingName}></input>
                            <input name="settingValueInput" className="textMedium w-50 mx-2" defaultValue={setting.settingValue}/>
                            <button type ="submit" className = "btn btn-primary">Update</button>
                        </form>
                        ))
                    )}
            </div>
            );
}

export async function getAllSettings()
{
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/settings/get", {
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
        data.sort((a, b) => a.settingName > b.settingName)
        return data;
    } catch (error) {
        console.error('Error fetching settings: ' + error);
        alert('Error fetching settings: ' + error);
        return null;
    }
}