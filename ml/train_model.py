import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score, precision_score,
    recall_score, f1_score, roc_auc_score,
    confusion_matrix, classification_report
)
import joblib
import os

# ── 1. Load dataset ──────────────────────────────────────────────────────────
print("Loading dataset...")
df = pd.read_csv("diabetes.csv")
print(f"Dataset shape: {df.shape}")
print(df.head())

# ── 2. Handle zero values (invalid medically) ────────────────────────────────
cols_with_zeros = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI"]
for col in cols_with_zeros:
    df[col] = df[col].replace(0, np.nan)
    df[col] = df[col].fillna(df[col].median())

print("\nAfter handling zero values:")
print(df.isnull().sum())

# ── 3. Split features and target ─────────────────────────────────────────────
X = df.drop("Outcome", axis=1)
y = df["Outcome"]

print(f"\nFeatures: {X.columns.tolist()}")
print(f"Target distribution:\n{y.value_counts()}")

# ── 4. Train / test split ────────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"\nTrain size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")

# ── 5. Scale features ────────────────────────────────────────────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ── 6. Train Logistic Regression ─────────────────────────────────────────────
print("\nTraining Logistic Regression model...")
model = LogisticRegression(
    max_iter=1000,
    random_state=42,
    C=1.0,
    solver="lbfgs"
)
model.fit(X_train_scaled, y_train)

# ── 7. Evaluate ───────────────────────────────────────────────────────────────
y_pred      = model.predict(X_test_scaled)
y_pred_prob = model.predict_proba(X_test_scaled)[:, 1]

accuracy  = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall    = recall_score(y_test, y_pred)
f1        = f1_score(y_test, y_pred)
roc_auc   = roc_auc_score(y_test, y_pred_prob)

print("\n" + "="*50)
print("         MODEL EVALUATION RESULTS")
print("="*50)
print(f"  Accuracy  : {accuracy:.4f}  ({accuracy*100:.2f}%)")
print(f"  Precision : {precision:.4f}")
print(f"  Recall    : {recall:.4f}")
print(f"  F1 Score  : {f1:.4f}")
print(f"  ROC-AUC   : {roc_auc:.4f}")
print("="*50)
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# ── 8. Feature importance ─────────────────────────────────────────────────────
feature_names = X.columns.tolist()
coefficients  = model.coef_[0]
importance_df = pd.DataFrame({
    "Feature":    feature_names,
    "Coefficient": coefficients,
    "Abs_Coef":   np.abs(coefficients)
}).sort_values("Abs_Coef", ascending=False)

print("\nFeature Importance (by coefficient magnitude):")
print(importance_df[["Feature", "Coefficient"]].to_string(index=False))

# ── 9. Save model & scaler ───────────────────────────────────────────────────
os.makedirs("models", exist_ok=True)
joblib.dump(model,  "models/model.pkl")
joblib.dump(scaler, "models/scaler.pkl")

print("\n✓ model.pkl  saved to models/")
print("✓ scaler.pkl saved to models/")
print("\nTraining complete!")