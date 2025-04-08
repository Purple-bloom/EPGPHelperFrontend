import 'bootstrap/dist/css/bootstrap.css';
import { ListAllSrs, CreateSrForm, DeleteSrForm, ViewSrsPerCharacter } from "../Services/SrService.js";

export default function SoftReserves() {
    return (
            <div className="bg-dark text-light container-fluid">
                <h1>SoftReserves</h1>
                <div className="row">
                    <div className = "col">
                        <CreateSrForm />
                        <ViewSrsPerCharacter />
                        <DeleteSrForm />
                    </div>
                    <div className = "col">
                        <ListAllSrs />
                    </div>
                </div>
            </div>
            );
};


