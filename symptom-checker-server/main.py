from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Load model and data
model = joblib.load("model.pkl")
all_symptoms = joblib.load("symptom_list.pkl")
precaution_df = pd.read_csv("Disease precaution.csv")
description_df = pd.read_csv("disease_description.csv")

# Create mappings
precaution_map = {
    row['Disease'].strip(): [
        row[f'Precaution_{i}'] for i in range(1, 5)
        if pd.notna(row[f'Precaution_{i}'])
    ]
    for _, row in precaution_df.iterrows()
}
description_map = dict(zip(description_df['Disease'].str.strip(), description_df['Description']))

# FastAPI setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class SymptomRequest(BaseModel):
    symptoms: list[str]

@app.get("/symptoms")
def get_symptom_list():
    return {"symptoms": all_symptoms}

@app.post("/predict")
def predict_disease(req: SymptomRequest):
    input_vector = [1 if s in req.symptoms else 0 for s in all_symptoms]
    df = pd.DataFrame([input_vector], columns=all_symptoms)
    probs = model.predict_proba(df)[0]

    top_indices = probs.argsort()[-3:][::-1]
    predictions = [
        {
            "disease": model.classes_[i],
            "confidence": float(probs[i]),
            "description": description_map.get(model.classes_[i], ""),
            "precautions": precaution_map.get(model.classes_[i], [])
        }
        for i in top_indices
    ]

    top_confidences = sorted(
        [{"disease": model.classes_[i], "confidence": float(probs[i])} for i in range(len(probs))],
        key=lambda x: x["confidence"],
        reverse=True
    )[:10]

    return {
        "predictions": predictions,
        "confidence_chart": top_confidences
    }
