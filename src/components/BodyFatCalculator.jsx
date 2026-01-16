import { useState } from "react";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [bodyFat, setBodyFat] = useState(null);

  const calculateBodyFat = () => {
    if (!height || !neck || !waist) {
      alert("Please fill required fields");
      return;
    }

    let result;

    if (gender === "male") {
      result =
        86.01 * Math.log10(waist - neck) -
        70.041 * Math.log10(height) +
        36.76;
    } else {
      if (!hip) {
        alert("Hip measurement is required for females");
        return;
      }

      result =
        163.205 * Math.log10(waist + hip - neck) -
        97.684 * Math.log10(height) -
        78.387;
    }

    setBodyFat(result.toFixed(2));
  };

  return (
    <div className="bodyfat-container">
        <div className="bodyfat-card">
      <h2>📊 TG's Body Fat Calculator</h2>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
      className="bf-input"
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <input
      className="bf-input"
        type="number"
        placeholder="Neck (cm)"
        value={neck}
        onChange={(e) => setNeck(e.target.value)}
      />

      <input
      className="bf-input"
        type="number"
        placeholder="Waist (cm)"
        value={waist}
        onChange={(e) => setWaist(e.target.value)}
      />

      {gender === "female" && (
        <input
        className="bf-input"
          type="number"
          placeholder="Hip (cm)"
          value={hip}
          onChange={(e) => setHip(e.target.value)}
        />
      )}

      <button className="bf-btn" onClick={calculateBodyFat}>Calculate</button>
<div className="bf-result">
      {bodyFat && (
        <p>
          ✅ Body Fat Percentage: <strong>{bodyFat}%</strong>
        </p>
      )}
      </div>
    </div>
    </div>
  );
};

export default BodyFatCalculator;
