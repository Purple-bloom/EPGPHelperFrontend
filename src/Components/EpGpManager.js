import 'bootstrap/dist/css/bootstrap.css';
import {GpAwardForm, ApplyWeeklyDecayForm, RewardPlayersForm, PartitionPlayerRewardsForm} from '../Services/EpgpService.js'

export default function EpGp({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>EP/GP</h1>
                <ApplyWeeklyDecayForm token={token} />
                <div className="row">
                    <div className = "col-5">
                        <RewardPlayersForm token={token} />
                    </div>
                    <div className = "col">
                        <PartitionPlayerRewardsForm token={token} />
                    </div>
                    <div className = "col-4">
                        <GpAwardForm token={token} />
                    </div>
                </div>
            </div>
            );
};
