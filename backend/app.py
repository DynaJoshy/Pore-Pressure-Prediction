from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained model
with open('pore_pressure_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "Welcome to the Pore Pressure Detection!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features'])
    prediction = model.predict([features])
    return jsonify({'prediction': float(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
