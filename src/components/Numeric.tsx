import { useState } from "react";

import icon from "../assets/icons8-teléfono-64.png";
import icon2 from "../assets/icons8-finalizar-llamada-64.png";

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

  const buttons = Array.from(
    { length: 12 },
    (_, i) => i < 9 ? (i + 1).toString() : i === 9 ? "*" : i === 10 ? "0" : "#",
  );

  const zoneCode: Record<string, number> = {
    mx: +52,
    us: +1,
    ca: +1,
    uk: +44,
    de: +49,
    es: +34,
    it: +39,
  };

  return (
    <>
      <div className={`keypad-container ${isCalling ? "calling" : ""}`}>
        <div className="display-panel">
          <select
            name="country"
            id="country"
            className="country"
            onChange={(e) =>
              setdisplayValue(
                zoneCode[e.target.value as keyof typeof zoneCode].toString(),
              )}
          >
            {Object.keys(zoneCode).map((code) => (
              <option key={code} value={code}>
                {code.toUpperCase()}
              </option>
            ))}
          </select>
          <span className="zone-code">
            {zoneCode["mx"]}
            <input
              type="text"
              value={displayValue}
              readOnly
              className="display"
              onKeyDown={(e) => {
                if (!isNaN(Number(e.key)) || ["*", "#"].includes(e.key)) {
                  handleNumberClick(e.key);
                } else if (e.key === "Backspace") {
                  setdisplayValue((prev) => prev.slice(0, -1));
                }
              }}
            />
          </span>
        </div> {/* Mueve el cierre del div aquí */}

        {!isCalling && (
          <button
            onClick={handleClear}
            className="clear-button"
          >
            Clear
          </button>
        )}

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
            {!isCalling && (
            <button onClick={handleAnswer}>
              <img src={icon} alt="Answering" />
            </button>
            )}
            {isCalling && (
            <button onClick={handleHangup}>
              <img src={icon2} alt="Hang up" />
            </button>
            )}
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
