import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import Home from "../Home";
import { Link } from 'react-router-dom';

export default function Navigation() {
return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/players">Players</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/characters">Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/raidrewards">Manage Rewards</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/gp">GP</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ep">EP</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/items">(OLD) Items</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/softreserves">(OLD) SR+</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/raidruns">(OLD) Raidruns</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        );
};
