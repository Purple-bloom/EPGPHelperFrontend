import 'bootstrap/dist/css/bootstrap.css';
import { ListAllLogs } from "../Services/LogService.js";

export default function Logs() {
    return (
            <div className="bg-dark text-light container-fluid">
                <h1>Logs</h1>
                <div className="row">
                    <div className = "col">
                        <ListAllLogs />
                    </div>
                </div>
            </div>
            );
};


