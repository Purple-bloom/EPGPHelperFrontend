import 'bootstrap/dist/css/bootstrap.css';
import {GpAwardForm, ApplyWeeklyDecayForm} from '../Services/EpgpService.js'
import {RewardPlayersForm, PartitionPlayerRewardsForm} from '../Services/EpService.js'

export default function Ep() {
    return (
            <div className="bg-dark text-light container">
                <h1>EP</h1>
                <ApplyWeeklyDecayForm />
                <div className="row">
                    <div className = "col">
                        <RewardPlayersForm />
                    </div>
                    <div className = "col">
                        <PartitionPlayerRewardsForm />
                    </div>
                </div>
            </div>
            );
};
