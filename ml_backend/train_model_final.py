import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import classification_report
from imblearn.over_sampling import SMOTE
from sklearn.preprocessing import LabelEncoder

# -------------------------------
# 1. Load dataset
# -------------------------------
data = pd.read_csv("Malnutrition data.csv")

# Features (EXACT from CSV)
X = data[
    [
        "Sex",
        "Age",
        "Height",
        "Weight",
        "Low Income",
        "Lower Middle Income",
        "Upper Middle Income",
    ]
]

# Target
y = data["Status"]

# Encode target labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

joblib.dump(label_encoder, "label_encoder.joblib")

print("Class distribution:")
print(pd.Series(y_encoded).value_counts())

# -------------------------------
# 2. Split data
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.3, random_state=42
)

# -------------------------------
# 3. Scale features
# -------------------------------
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

joblib.dump(scaler, "scaler.joblib")

# -------------------------------
# 4. Apply SMOTE (training only)
# -------------------------------
min_class = min(pd.Series(y_train).value_counts())
k_neighbors = min(5, min_class - 1)

smote = SMOTE(random_state=42, k_neighbors=k_neighbors)
X_train_res, y_train_res = smote.fit_resample(
    X_train_scaled, y_train
)

# -------------------------------
# 5. Train SVM model
# -------------------------------
model = SVC(kernel="rbf", probability=True)
model.fit(X_train_res, y_train_res)

# -------------------------------
# 6. Evaluate
# -------------------------------
y_pred = model.predict(X_test_scaled)
print("\nEvaluation Report:")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# -------------------------------
# 7. Save model
# -------------------------------
joblib.dump(model, "svm_model.joblib")

print("\n Training completed successfully!")
