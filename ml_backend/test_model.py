import joblib
import numpy as np

model = joblib.load("svm_model.joblib")
scaler = joblib.load("scaler.joblib")
label_encoder = joblib.load("label_encoder.joblib")

# Example: Stunting-like case
sample = np.array([
    [0, 5, 96, 25, 0, 0, 1]  # Sex, Age, Height, Weight, Income flags
])

sample_scaled = scaler.transform(sample)
prediction = model.predict(sample_scaled)

print("Predicted Class:", label_encoder.inverse_transform(prediction))
