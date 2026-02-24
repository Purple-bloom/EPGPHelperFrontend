import 'bootstrap/dist/css/bootstrap.css';
import {ListAllRaidrewards, CreateRaidrewardForm, UpdateRaidrewardForm, DeleteRaidrewardForm} from '../Services/RaidrewardService.js'

export default function RaidRewards({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>Raidrewards</h1>
                <div className="row">
                    <div className = "col">
                        <CreateRaidrewardForm token={token} />
                        <UpdateRaidrewardForm token={token} />
                        <DeleteRaidrewardForm token={token} />
                    </div>
                    <div className = "col">
                        <ListAllRaidrewards token={token} />
                    </div>
                </div>
            </div>
            );
};
