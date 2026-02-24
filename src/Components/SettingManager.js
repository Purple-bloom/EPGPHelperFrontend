import 'bootstrap/dist/css/bootstrap.css';
import {SettingsInterface} from '../Services/SettingService.js'

export default function Settings({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>Settings</h1>
                <SettingsInterface token={token} />
            </div>
            );
}