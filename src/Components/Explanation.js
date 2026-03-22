import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom";

const steps = [
    {
        heading: "Starting positions",
        alice: { ep: 1800, gp: 20 },
        bob: { ep: 1200, gp: 40 },
        note: "Alice has been raiding a long time. Her PR of 90 is high. Bob is newer; his PR of 30 just qualifies him to bid mid."
    },
    {
        heading: "An item drops — Alice bids low, Bob bids mid",
        alice: { ep: 1800, gp: 20, bid: 'low' },
        bob: { ep: 1200, gp: 40, bid: 'mid' },
        note: "Alice only wants this a little (bids low). Bob really wants it and qualifies for mid (PR 30).",
        winner: "Bob"
    },
    {
        heading: "Bob wins — mid bid costs +30 GP",
        alice: { ep: 1800, gp: 20 },
        bob: { ep: 1200, gp: 70, gpChange: "+30" },
        note: "Bob's PR drops to 17.1. He's now below the mid threshold (30)."
    },
    {
        heading: "Alice wins a high bid — costs +90 GP",
        alice: { ep: 1800, gp: 110, gpChange: "+90" },
        bob: { ep: 1200, gp: 70 },
        note: "Alice's PR crashes to 16.4. She got the item, but Bob now has higher priority!"
    }
];

export default function Explanation() {
    const [current, setCurrent] = useState(0);
    const s = steps[current];

    const calculatePr = (ep, gp) => (ep / gp).toFixed(1);

    return (
            <div className="bg-dark text-light app-container">
                <h4 className="text-info">{s.heading}</h4>
                <div className="d-flex gap-2 mb-3">
                    {steps.map((_, i) => (
                        <div key={i} className={`rounded-circle ${i === current ? 'bg-info' : 'bg-dark'}`} style={{width: 10, height: 10}} />
                    ))}
                </div>

                <hr className="border-light" />
                <div className="vstack gap-3">
                    {[ { name: "Alice", data: s.alice }, { name: "Bob", data: s.bob } ].map(raider => (
                        <div key={raider.name} className="d-flex align-items-center gap-3">
                            <strong style={{width: '60px'}}>{raider.name}</strong>
                            <div className="badge bg-dark p-2">EP: {raider.data.ep}</div>
                            <span>÷</span>
                            <div className="badge bg-dark p-2">
                                GP: {raider.data.gp}
                                {raider.data.gpChange && <span className="text-danger ms-1">{raider.data.gpChange}</span>}
                            </div>
                            <span>=</span>
                            <div className={`badge p-2 ${raider.name === s.winner ? 'bg-success' : 'bg-primary'}`}>
                                PR: {calculatePr(raider.data.ep, raider.data.gp)}
                            </div>
                            {raider.data.bid && <span className="badge bg-warning text-dark">Bids {raider.data.bid}</span>}
                        </div>
                    ))}
                </div>

                <div className="mt-3 p-3 bg-dark rounded border-start border-info border-4">
                    <small className="fst-italic">{s.note}</small>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button
                        className="btn btn-outline-light btn-sm"
                        disabled={current === 0}
                        onClick={() => setCurrent(c => c - 1)}
                    >
                        ← Back
                    </button>
                    <button
                        className="btn btn-info btn-sm"
                        disabled={current === steps.length - 1}
                        onClick={() => setCurrent(c => c + 1)}
                    >
                        {current === steps.length - 1 ? "End of Guide" : "Next Step →"}
                    </button>
                </div>
            </div>
            );
}
