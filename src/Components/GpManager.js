import 'bootstrap/dist/css/bootstrap.css';
import {RewardPlayersForm, GpAwardForm, ApplyWeeklyDecayForm} from '../Services/EpgpService.js'
import {ListAllPlayers} from '../Services/PlayerService.js'

export default function Gp() {
    return (
            <div className="bg-dark text-light container">
                <h1>GP</h1>
                <ApplyWeeklyDecayForm />
                <div className="row">
                    <div className = "col">
                        <ListAllPlayers />
                    </div>
                    <div className = "col">
                        <GpAwardForm />
                    </div>
                </div>
            </div>
            );
};
