import 'bootstrap/dist/css/bootstrap.css';
import {SettingsInterface} from '../Services/SettingService.js'

export default function Settings() {
    return (
            <div className="bg-dark text-light container">
                <h1>Settings</h1>
                <SettingsInterface/>
            </div>
            );
}