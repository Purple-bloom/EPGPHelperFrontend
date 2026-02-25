import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import Home from "../Home";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Navigation({ token }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/players">Players</Link>
                        </li>}
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/characters">Characters</Link>
                        </li>}
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/raidrewards">Manage Rewards</Link>
                        </li>}
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/gp">GP</Link>
                        </li>}
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/ep">EP</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/recentlogs">Recent Logs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/PublicView">View Prios</Link>
                        </li>
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/log">Logs</Link>
                        </li>}
                        {token && <li className="nav-item">
                            <Link className="nav-link" to="/settings">Settings</Link>
                        </li>}
                        {!token && <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>}
                        {token && <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                            Logout
                        </button>}
                    </ul>
                </div>
            </div>
        </nav>
        );
};
