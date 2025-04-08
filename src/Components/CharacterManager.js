import 'bootstrap/dist/css/bootstrap.css';
import {AddCharacterForm, EditCharacterForm, ViewCharactersForPlayer, DeleteCharacterForm, ViewAllCharacters} from '../Services/CharacterService.js'

export default function Characters() {
    return (
            <div className="bg-dark text-light container">
                <h1>Characters</h1>
                <div className="row">
                    <div className = "col">
                        <AddCharacterForm />
                        <EditCharacterForm />
                        <DeleteCharacterForm />
                    </div>
                    <div className = "col">
                        <ViewCharactersForPlayer />
                        <ViewAllCharacters />
                    </div>
                </div>
            </div>
            );
};
