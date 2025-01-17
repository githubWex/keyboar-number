import { useEffect, useState } from "react";

import icon from "../assets/icons8-teléfono-64.png";
import icon2 from "../assets/icons8-finalizar-llamada-64.png";
import { Timer } from "./Timer";

interface NumericKeyboard {
  onAnswer?: () => void;
  onHangup?: () => void;
}

export const Numeric: React.FC<NumericKeyboard> = ({ onAnswer, onHangup }) => {
  const [displayValue, setdisplayValue] = useState<string>("");
  const [isCalling, setisCalling] = useState<boolean>(false);
  const [zoneCode, setZoneCode] = useState<Record<string, string>>({});

  const buttons = Array.from(
    { length: 12 },
    (_, i) => i < 9 ? (i + 1).toString() : i === 9 ? "*" : i === 10 ? "0" : "#",
  );

  const handleNumberClick = (value: string) => {
    setdisplayValue((prev) => prev + value);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isNaN(Number(e.key)) || ["*", "#"].includes(e.key)) {
      handleNumberClick(e.key);
    } else if (e.key === "Backspace") {
      setdisplayValue((prev) => prev.slice(0, -1));
    }
  };
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const newZoneCode: Record<string, string> = {};
        data.forEach((country: any) => {
          if (country.idd && country.idd.root && country.idd.suffixes) {
            newZoneCode[country.cca2.toLowerCase()] = country.idd.root +
              country.idd.suffixes[0];
          }
        });
        const sortedZoneCode = Object.keys(newZoneCode)
          .sort()
          .reduce((acc, key) => {
            acc[key] = newZoneCode[key];
            return acc;
          }, {} as Record<string, string>);
        setZoneCode(sortedZoneCode);
        setdisplayValue(sortedZoneCode["mx"]); // Set default to MX
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
    };
    fetchCountryCodes();
  }, []);

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
            <input
              type="text"
              value={displayValue}
              readOnly
              className="display"
              onKeyDown={handleKeyDown}
            />
          </span>
        </div>

        {isCalling && <Timer isRunning={isCalling} />}

        {!isCalling && (
            <button
            onClick={() => setdisplayValue(zoneCode["mx"])}
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

        <div>
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
          <div className={`calling-dot visible`}>
            Calling{".".repeat(Math.floor((Date.now() / 500) % 4))}
          </div>
        )}
      </div>
    </>
  );
};
