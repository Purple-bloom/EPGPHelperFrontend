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
        heading: "An item drops: Alice bids low, Bob bids mid",
        alice: { ep: 1800, gp: 20, bid: 'low', bidOk: true },
        bob: { ep: 1200, gp: 40, bid: 'mid', bidOk: true },
        note: "Alice only wants this a little (bids low). Bob really wants it and qualifies for mid (PR 30).",
        winner: "Bob"
    },
    {
        heading: "Bob wins and gets +30 GP (price of a mid bid)",
        alice: { ep: 1800, gp: 20 },
        bob: { ep: 1200, gp: 70, gpChange: "+30" },
        note: "Bob's PR drops to 17.1. He's now below the mid threshold (30)."
    },
    {
        heading: "Another item drops: Alice bids high, Bob tries mid",
        alice: { ep: 1800, gp: 20,  bid: 'high', bidOk: true },
        bob:   { ep: 1200, gp: 70,  bid: 'mid', bidOk: false, downgradeTo: 'low' },
        note: "It's a big item: Alice wants it badly and her PR of 90 qualifies her for a high bid. Bob tries to bid mid, but his PR is only 17.1 which is below the 30 threshold. His bid is dropped to low.",
    },
    {
        heading: "Alice wins a high bid and gets +90 GP (price of a high bid)",
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
            <div className="card bg-dark text-light border-secondary mx-auto shadow"
                         style={{ maxWidth: '600px', minHeight: '450px' }}>

                        <div className="card-body d-flex flex-column p-4">
                            <div className="text-center mb-3">
                                <h5 className="text-info mb-2">{s.heading}</h5>
                                <div className="d-flex justify-content-center gap-1">
                                    {steps.map((_, i) => (
                                        <div key={i}
                                             className={`rounded-pill ${i === current ? 'bg-info' : 'bg-secondary'}`}
                                             style={{ width: i === current ? '20px' : '8px', height: '8px', transition: '0.3s' }} />
                                    ))}
                                </div>
                            </div>

                            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                <div className="vstack gap-2 border-top border-bottom border-secondary py-3 my-2">
                                    {[ { name: "Alice", data: s.alice }, { name: "Bob", data: s.bob } ].map(raider => (
                                        <div key={raider.name} className="d-flex align-items-center justify-content-between">
                                            <span className="fw-bold" style={{width: '50px'}}>{raider.name}</span>
                                            <div className="d-flex align-items-center gap-2 flex-grow-1 justify-content-center">
                                                <span className="badge bg-secondary text-light px-2">{raider.data.ep} EP</span>
                                                <span className="text-muted">÷</span>
                                                <span className="badge bg-secondary text-light px-2">
                                                    {raider.data.gp} GP
                                                    {raider.data.gpChange && <span className="text-danger-emphasis ms-1">{raider.data.gpChange}</span>}
                                                </span>
                                                <span className="text-muted">=</span>
                                                <span className={`badge px-2 ${raider.name === s.winner ? 'bg-success' : 'bg-primary'}`}>
                                                    {calculatePr(raider.data.ep, raider.data.gp)} PR
                                                </span>
                                            </div>
                                            <div style={{minWidth: 'fit-content', textAlign: 'right'}}>
                                                {raider.data.bid && <span className="badge bg-warning text-dark" style={{fontSize: '0.7rem'}}>{raider.data.bid}
                                                {raider.data.bidOk == false && <span className="ms-1 fw-bold">bid downgrade to {raider.data.downgradeTo}</span>}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-2 text-center">
                                    <p className="text-light mb-0" style={{ lineHeight: '1.4' }}>
                                        {s.note}
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center pt-3 mt-auto">
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    disabled={current === 0}
                                    onClick={() => setCurrent(c => c - 1)}
                                >
                                    ← Back
                                </button>
                                <span className="small text-secondary">{current + 1} / {steps.length}</span>
                                <button
                                    className="btn btn-sm btn-info"
                                    disabled={current === steps.length - 1}
                                    onClick={() => setCurrent(c => c + 1)}
                                >
                                    {current === steps.length - 1 ? "Done" : "Next →"}
                                </button>
                            </div>
                        </div>
                    </div>
            );
}
