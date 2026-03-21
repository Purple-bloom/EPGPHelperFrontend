import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { useRef } from 'react';
import Home from "../Home";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Navigation({ token }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };
    const navBarRef = useRef(null);
    const closeNavbar = () => {
        if (navBarRef.current && navBarRef.current.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler?.click();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" ref={navBarRef}>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/" onClick={closeNavbar}>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/recentlogs" onClick={closeNavbar}>Recent Logs</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/PublicView" onClick={closeNavbar}>View Prios</Link></li>
                        {!token && <li className="nav-item"><Link className="nav-link" to="/login" onClick={closeNavbar}>Login</Link></li>}

                        {token && (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/players" onClick={closeNavbar}>Players</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/characters" onClick={closeNavbar}>Characters</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/raidrewards" onClick={closeNavbar}>Rewards</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/gp" onClick={closeNavbar}>GP</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/ep" onClick={closeNavbar}>EP</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/log" onClick={closeNavbar}>Logs</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/settings" onClick={closeNavbar}>Settings</Link></li>
                                                                                                                                                                                                           </li>
                                <button className="btn btn-outline-danger ms-3" onClick={() => {handleLogout();closeNavbar();}}>Logout</button>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        );
};
