import 'bootstrap/dist/css/bootstrap.css';
import {AddonExportForm, AddonImportForm} from '../Services/AddonService.js'

export default function Addon({ token }) {
    return (
            <div className="bg-dark text-light container">
                <h1>ADDON INTERACTION</h1>
                <div className="row">
                    <div className = "col">
                        <AddonExportForm token={token} />
                    </div>
                    <div className = "col">
                        <AddonImportForm token={token} />
                    </div>
                </div>
            </div>
            );
};