import 'bootstrap/dist/css/bootstrap.css';
import {GetPlayerForIdForm, GetPlayerForNameForm, AddPlayerForm, EditPlayerForm, DeletePlayerForm, getAllPlayers, SelectPlayer, ListAllPlayers}
from '../Services/PlayerService.js'

export default function Players({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>Players</h1>
                <div className="row">
                    <div className = "col">
                        <AddPlayerForm token={token} />
                        <EditPlayerForm token={token} />
                        <DeletePlayerForm token={token} />
                    </div>
                    <div className = "col">
                        <ListAllPlayers token={token} />
                    </div>
                </div>
            </div>
            );
}