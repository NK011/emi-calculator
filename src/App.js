import { useState } from "react";
import "./App.css";

function App() {
    const [principalAmt, setPrincipalAmt] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [roi, setRoi] = useState(0);
    const [tenure, setTenure] = useState(0);
    const [emi, setEmi] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const r = roi / 1200;
        const t = Math.pow(1 + r, tenure);
        const calulatedEmi = ((principalAmt - downPayment) * r * t) / (t - 1);
        setEmi(calulatedEmi);
    };

    const handleInput = (e) => {
        const { name, value } = e?.target;
        if (name === "principalAmt") {
            setPrincipalAmt(value);

            if (value < downPayment) {
                setDownPayment(value);
            }
        } else if (name === "downPayment") {
            setDownPayment(value);
        } else if (name === "roi") {
            setRoi(value);
        } else if (name === "tenure") {
            setTenure(value);
        } else {
            window.alert("Invalid key press");
        }
    };

    return (
        <div className="App">
            <h3>EMI Calculator</h3>
            <form onSubmit={handleSubmit} className="emi__form">
                <div className="emi__form__field">
                    <label>
                        Load Amount:
                    </label>
                    <input
                        name="principalAmt"
                        type="number"
                        placeholder="Emter Load Amount"
                        min="0"
                        onChange={handleInput}
                        value={principalAmt}
                    />
                </div>
                <div className="emi__form__field">
                <label>
                        Down Payment:
                    </label>
                    <input
                        name="downPayment"
                        type="number"
                        placeholder="Emter Down Payment"
                        min="0"
                        max={principalAmt}
                        onChange={handleInput}
                        value={downPayment}
                    />
                    <input
                        name="downPayment"
                        type="range"
                        min="0"
                        max={principalAmt}
                        disabled={!principalAmt}
                        onChange={handleInput}
                        value={downPayment}
                    />
                </div>
                <div className="emi__form__field">
                    <input
                        name="roi"
                        type="number"
                        placeholder="Emter Rate of Interest"
                        min="0"
                        max="100"
                        onChange={handleInput}
                        value={roi}
                    />
                    <input
                        name="roi"
                        type="range"
                        min="0"
                        max="100"
                        disabled={!principalAmt}
                        onChange={handleInput}
                        value={roi}
                    />
                </div>
                <div className="emi__form__field">
                    <input
                        name="tenure"
                        type="number"
                        placeholder="Emter Tenure"
                        onChange={handleInput}
                        value={tenure}
                    />
                    <input
                        type="range"
                        name="tenure"
                        min="0"
                        max="84"
                        disabled={!principalAmt}
                        onChange={handleInput}
                        value={tenure}
                    />
                </div>
                <input name="formSubmit" type="submit" />
            </form>
            {emi ? (
                <div className="emi__info">
                    <p>
                        Your EMI will be: <span>{emi.toFixed(2)}</span>
                    </p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default App;
