import 'bootstrap/dist/css/bootstrap.css';
import {ListAllPlayers} from '../Services/PlayerService.js'

export default function PublicView({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>PRIO</h1>
                <div className="row">
                    <ListAllPlayers/>
                </div>
            </div>
            );
};
