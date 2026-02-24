import 'bootstrap/dist/css/bootstrap.css';
import {GpAwardForm, ApplyWeeklyDecayForm} from '../Services/EpgpService.js'
import {ListAllPlayers} from '../Services/PlayerService.js'

export default function Gp({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>GP</h1>
                <ApplyWeeklyDecayForm token={token} />
                <div className="row">
                    <div className = "col-8">
                        <ListAllPlayers token={token} />
                    </div>
                    <div className = "col-4">
                        <GpAwardForm token={token} />
                    </div>
                </div>
            </div>
            );
};
