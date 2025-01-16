import { useState } from "react";

import icon from "../../public/icons8-phone.gif";

interface NumericKeyboard {
    onAnswer?: () => void;
    onHangup?: () => void;
}

export const Numeric: React.FC<NumericKeyboard> = ({ onAnswer, onHangup }) => {
    const [displayValue, setdisplayValue] = useState<string>("");
    const [isCalling, setisCalling] = useState<boolean>(false);

    const handleNumberClick = (value: string) => {
        setdisplayValue((prev) => prev + value);
    };

    const handleClear = () => {
        setdisplayValue("");
        setisCalling(false);
    };

    const handleAnswer = () => {
        if (onAnswer) {
            onAnswer();
        }
        setisCalling(true);
    };

    const handleHangup = () => {
        if (onHangup) {
            onHangup();
        }
        setisCalling(false);
    };

    const buttons = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "*",
        "0",
        "#",
    ];

    const zoneCode = {
        mx: +52,
        us: +1,
        ca: +1,
        uk: +44,
        de: +49,
        es: +34,
        it: +39,
    }

    return (
        <>
            <div className={`keypad-container ${isCalling ? "calling" : ""}`}>
                <div className="display-panel">

                    <select
                        name="country"
                        id="country"
                        className="country"
                        onChange={(e) => setdisplayValue(zoneCode[e.target.value as keyof typeof zoneCode].toString())}
                    >
                        {Object.keys(zoneCode).map((code) => (
                            <option key={code} value={code}>
                                {code.toUpperCase()}
                            </option>
                        ))}
                    </select>
                    <span className="zone-code">
                        {zoneCode["mx"]}
                    </span>
                    <input
                        type="text"
                        value={displayValue}
                        readOnly
                        className="display"
                    />
                    {!isCalling && (
                        <button
                            onClick={handleClear}
                            className="clear-button"
                        >
                            Clear
                        </button>
                    )}


                </div>

                <div className={`keypad-grid ${isCalling ? "hidden" : ""}`}>
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handleNumberClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
                <div className="action-buttons">
                    <button
                        onClick={handleAnswer}
                        className={`answer-button ${isCalling ? "hidden" : ""}`}
                    >
                        <img
                            src={icon}
                            alt="Answering"
                            className="answer-gif"
                        />
                    </button>
                    <button
                        onClick={handleHangup}
                        className={`hangup-button ${isCalling ? "" : "hidden"}`}
                    >
                        Hangup
                    </button>
                </div>

                {isCalling && (
                    <div className="calling-dots visible">
                        Calling{".".repeat(Math.floor((Date.now() / 500) % 4))}
                    </div>
                )}
            </div>
        </>
    );
};
