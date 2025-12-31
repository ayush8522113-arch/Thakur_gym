import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const navigate = useNavigate();

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = height / 100;
    const value = (weight / (h * h)).toFixed(1);
    setBmi(value);
  };

  return (
    <div className="bmi-card">
      <div className="bmi-header">
        <h3>TG's BMI Calculator</h3>
        <p>Check your body mass index</p>
      </div>

      <div className="bmi-body">
        <div className="bmi-input-group">
          <label>Height (cm)</label>
          <input
            type="number"
            placeholder="e.g. 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="bmi-input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            placeholder="e.g. 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button className="bmi-calc-btn" onClick={calculateBMI}>
          Calculate BMI
        </button>

        {bmi && (
          <div className="bmi-result-box">
            <span>Your BMI</span>
            <strong>{bmi}</strong>
          </div>
        )}
      </div>

      <button
        className="bmi-chart-btn"
        onClick={() => navigate("/bmi-chart")}
      >
        See Chart →
      </button>
    </div>
  );
};

export default BMICalculator;
