import 'bootstrap/dist/css/bootstrap.css';
import { ListRecentLogs } from "../Services/LogService.js";

export default function RecentLogs() {
    return (
            <div className="bg-dark text-light container-fluid">
                <h1>Logs</h1>
                <div className="row">
                    <div className = "col">
                        <ListRecentLogs />
                    </div>
                </div>
            </div>
            );
};


