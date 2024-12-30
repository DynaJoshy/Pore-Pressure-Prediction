from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model and scaler
with open("pore_pressure_model.pkl", "rb") as f:
    data = pickle.load(f)
    model = data["model"]
    scaler = data["scaler"]

@app.route("/predict", methods=["POST"])
def predict():
    # Parse input data
    input_data = request.json
    try:
        # Extract parameters
        depth = float(input_data["DEPTH"])
        GRs = float(input_data["GR"])
        porosity = float(input_data["Porosity"])
        Vps = float(input_data["Vp"])
        RHOBs = float(input_data["RHOB"])
        Stress=float(input_data["Stress"])
        # Prepare input for the model
        features = np.array([[depth, GRs, porosity, Vps, RHOBs,Stress]])
        scaled_features = scaler.transform(features)

        # Make prediction
        prediction = model.predict(scaled_features)[0]
        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
