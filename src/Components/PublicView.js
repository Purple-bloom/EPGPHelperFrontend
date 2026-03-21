import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react'; // 1. Import useState
import {ListAllPlayers} from '../Services/PlayerService.js'
import {ListRecentLogs} from '../Services/LogService.js'

export default function PublicView({ token }) {
    const [view, setView] = useState('prio');

    return (
            <div className="row">
                <div className="d-flex justify-content-center mb-4">
                    <div className="btn-group" role="group">
                        <button
                            type="button"
                            className={`btn ${view === 'prio' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setView('prio')}
                        >
                            PRIO
                        </button>
                        <button
                            type="button"
                            className={`btn ${view === 'logs' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setView('logs')}
                        >
                            RECENT LOGS
                        </button>
                    </div>
                </div>
                <div className="bg-dark text-light container">
                    {view === 'prio' ? (
                        <div className="col-12">
                            <h1 className="text-center">PRIO</h1>
                            <ListAllPlayers />
                        </div>
                    ) : (
                        <div className="col-12">
                            <h1 className="text-center">RECENT LOGS</h1>
                            <ListRecentLogs />
                        </div>
                    )}
                </div>
            </div>
            );
};
