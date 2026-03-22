import 'bootstrap/dist/css/bootstrap.css';
import {AddCharacterForm, EditCharacterForm, DeleteCharacterForm, ViewAllCharacters} from '../Services/CharacterService.js'

export default function Characters({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>Characters</h1>
                <div className="row">
                    <div className = "col">
                        <AddCharacterForm token={token} />
                        <EditCharacterForm token={token} />
                        <DeleteCharacterForm token={token} />
                    </div>
                    <div className = "col">
                        <ViewAllCharacters token={token} />
                    </div>
                </div>
            </div>
            );
};
