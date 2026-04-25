from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os

# ── App setup ────────────────────────────────────────────────────────────────
app = FastAPI(
    title="DiabetesCare ML Service",
    description="Logistic Regression model for diabetes risk prediction",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load model & scaler on startup ───────────────────────────────────────────
MODEL_PATH  = "models/model.pkl"
SCALER_PATH = "models/scaler.pkl"

if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    raise RuntimeError("model.pkl or scaler.pkl not found. Run train_model.py first.")

model  = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

print("✓ Model loaded successfully")
print("✓ Scaler loaded successfully")

# ── Request / Response schemas ───────────────────────────────────────────────
class PredictRequest(BaseModel):
    Pregnancies:              float = Field(..., ge=0,    le=17,   example=2)
    Glucose:                  float = Field(..., ge=44,   le=199,  example=120)
    BloodPressure:            float = Field(..., ge=24,   le=122,  example=70)
    SkinThickness:            float = Field(..., ge=7,    le=99,   example=25)
    Insulin:                  float = Field(..., ge=14,   le=846,  example=85)
    BMI:                      float = Field(..., ge=10,   le=70,   example=28.5)
    DiabetesPedigreeFunction: float = Field(..., ge=0.07, le=2.42, example=0.45)
    Age:                      float = Field(..., ge=21,   le=81,   example=35)

class PredictResponse(BaseModel):
    prediction:        int
    probability:       float
    risk_level:        str
    confidence:        str
    feature_importance: list

# ── Feature importance from model coefficients ───────────────────────────────
FEATURE_NAMES = [
    "Pregnancies", "Glucose", "BloodPressure",
    "SkinThickness", "Insulin", "BMI",
    "DiabetesPedigreeFunction", "Age"
]

def get_feature_importance():
    coefs    = model.coef_[0]
    abs_coef = np.abs(coefs)
    total    = abs_coef.sum()
    return [
        {
            "feature":    name,
            "importance": round(float(abs_coef[i] / total), 4),
            "coefficient": round(float(coefs[i]), 4)
        }
        for i, name in enumerate(FEATURE_NAMES)
    ]

# ── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "service": "DiabetesCare ML Service",
        "status":  "running",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {
        "status":       "healthy",
        "model_loaded": True,
        "model_type":   type(model).__name__
    }

@app.post("/predict", response_model=PredictResponse)
def predict(data: PredictRequest):
    try:
        # Build feature array in correct order
        features = np.array([[
            data.Pregnancies,
            data.Glucose,
            data.BloodPressure,
            data.SkinThickness,
            data.Insulin,
            data.BMI,
            data.DiabetesPedigreeFunction,
            data.Age
        ]])

        # Scale using the saved scaler
        features_scaled = scaler.transform(features)

        # Predict
        prediction  = int(model.predict(features_scaled)[0])
        probability = float(model.predict_proba(features_scaled)[0][1])

        # Risk level
        if probability < 0.3:
            risk_level  = "Low"
            confidence  = "High confidence — low risk"
        elif probability < 0.5:
            risk_level  = "Moderate"
            confidence  = "Borderline — consult a doctor"
        elif probability < 0.7:
            risk_level  = "High"
            confidence  = "Elevated risk detected"
        else:
            risk_level  = "Very High"
            confidence  = "Strong risk indicators present"

        return PredictResponse(
            prediction        = prediction,
            probability       = round(probability, 4),
            risk_level        = risk_level,
            confidence        = confidence,
            feature_importance = get_feature_importance()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))