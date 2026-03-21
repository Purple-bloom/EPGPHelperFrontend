import 'bootstrap/dist/css/bootstrap.css';
import {ListAllPlayers} from '../Services/PlayerService.js'
import {ListRecentLogs} from '../Services/LogService.js'

export default function PublicView({ token }) {
    return (
            <div className="bg-dark text-light container">
                <div className="row">
                    <h1>PRIO</h1>
                    <ListAllPlayers/>
                </div>
                <div className="row">
                    <h1>RECENT LOGS</h1>
                    <ListRecentLogs/>
                </div>
            </div>
            );
};
