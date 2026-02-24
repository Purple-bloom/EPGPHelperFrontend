import 'bootstrap/dist/css/bootstrap.css';
import {GpAwardForm, ApplyWeeklyDecayForm} from '../Services/EpgpService.js'
import {RewardPlayersForm, PartitionPlayerRewardsForm} from '../Services/EpService.js'

export default function Ep({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>EP</h1>
                <ApplyWeeklyDecayForm token={token} />
                <div className="row">
                    <div className = "col">
                        <RewardPlayersForm token={token} />
                    </div>
                    <div className = "col">
                        <PartitionPlayerRewardsForm token={token} />
                    </div>
                </div>
            </div>
            );
};
