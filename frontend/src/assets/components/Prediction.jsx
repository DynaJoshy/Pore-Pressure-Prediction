import React, { useState } from "react";
import axios from 'axios';
import './Prediction.css';

const Prediction = () => {
  // Initialize state for five parameters
  const [inputs, setInputs] = useState({
    parameter1: "",
    parameter2: "",
    parameter3: "",
    parameter4: "",
    parameter5: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  // Update state when input changes
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Check if the input value is greater than 100
    if (value > 100) {
     alert("Input value cannot be greater than 100.");
    }

    setInputs({ ...inputs, [e.target.name]: value });
  };

  const determinePorosity = (inputs) => {
    let porosityResults = [];

    // Define porosity conditions
    const conditions = [
      { range: [1, 50], result: "Medium Porous" },
      { range: [51, 100], result: "Highly Porous" },
    ];

    // Check depth porosity
    for (const condition of conditions) {
      if (inputs.parameter2 >= condition.range[0] && inputs.parameter2 <= condition.range[1]) {
        porosityResults.push(`Depth: ${condition.result}`);
        break; // Exit loop once condition is met
      }
    }

    // Check other porosity
    for (const condition of conditions) {
      if (inputs.parameter4 >= condition.range[0] && inputs.parameter4 <= condition.range[1]) {
        porosityResults.push(`Porosity: ${condition.result}`);
        break; // Exit loop once condition is met
      }
    }

    return porosityResults.join(", ");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const porosityOutput = determinePorosity(inputs);

    // Removed API call
    setPrediction(porosityOutput); // Update prediction with porosity output
  };

  return (
    <div className="prediction-container">
      <h2>Prediction</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        {Object.keys(inputs).map((key) => (
          <div className="form-group" key={key}>
            <label>
              {`Parameter ${key.charAt(key.length - 1)} (e.g., ${key === 'parameter1' ? 'Pressure':key === 'parameter5' ? 'VOG':key === 'parameter2' ? 'Depth' : key === 'parameter4' ? 'Porosity' : 'Stress level'})`}:
              <input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>
          </div>
        ))}
        <button type="submit" className="submit-button">Predict</button>
      </form>

      {prediction && <p className="prediction-output">{prediction}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Prediction;
