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
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const determinePorosity = (inputs) => {
    let depthPorosity = "";
    let otherPorosity = "";

    if (inputs.parameter2 >= 1 && inputs.parameter2 <= 50) {
      depthPorosity = "Medium Porous";
    } else if (inputs.parameter2 >= 51 && inputs.parameter2 <= 100) {
      depthPorosity = "Highly Porous";
    }

    if (inputs.parameter4 >= 1 && inputs.parameter4 <= 50) {
      otherPorosity = "Highly Porous";
    } else if (inputs.parameter4 >= 51 && inputs.parameter4 <= 100) {
      otherPorosity = "Medium Porous";
    }

    return { depthPorosity, otherPorosity };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { depthPorosity, otherPorosity } = determinePorosity(inputs);

    try {
      const response = await axios.post('/api/predict', inputs);
      setPrediction(`Depth: ${depthPorosity}, Porosity: ${otherPorosity}`);
    } catch (error) {
      setError("Error fetching prediction");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="prediction-container">
      <h2>Prediction</h2>
      <form onSubmit={handleSubmit} className="prediction-form">
        {Object.keys(inputs).map((key) => (
          <div className="form-group" key={key}>
            <label>
              {`Parameter ${key.charAt(key.length - 1)} (e.g., ${key === 'parameter2' ? 'Depth' : key === 'parameter4' ? 'Porosity' : 'Other'})`}:
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

      {prediction && <p className="prediction-output">Prediction: {prediction}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Prediction;
