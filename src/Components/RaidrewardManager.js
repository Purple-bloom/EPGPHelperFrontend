import 'bootstrap/dist/css/bootstrap.css';
import {ListAllRaidrewards, CreateRaidrewardForm, UpdateRaidrewardForm, DeleteRaidrewardForm} from '../Services/RaidrewardService.js'

export default function RaidRewards() {
    return (
            <div className="bg-dark text-light container">
                <h1>Raidrewards</h1>
                <div className="row">
                    <div className = "col">
                        <CreateRaidrewardForm />
                        <UpdateRaidrewardForm />
                        <DeleteRaidrewardForm />
                    </div>
                    <div className = "col">
                        <ListAllRaidrewards />
                    </div>
                </div>
            </div>
            );
};
