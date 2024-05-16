from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
from pydantic import BaseModel
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import joblib

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Wine(BaseModel):
    fixed_acidity: float
    volatile_acidity: float
    citric_acid: float
    residual_sugar: float
    chlorides: float
    free_sulfur_dioxide: float
    total_sulfur_dioxide: float
    density: float     
    pH: float                   
    sulphates: float            
    alcohol: float                        

model = joblib.load("model.joblib")
scaler = joblib.load("scaler.joblib")

@app.get("/")
async def main():
    return {
        "message": "Welcome to Wine Quality Detection API."
    }

@app.post("/quality/")
async def quality_check(wine: Wine):
    input_data = {
        "fixed acidity": wine.fixed_acidity,
        "volatile acidity": wine.volatile_acidity,
        "citric acid": wine.citric_acid,
        "residual sugar": wine.residual_sugar,
        "chlorides": wine.chlorides,
        "free sulfur dioxide": wine.free_sulfur_dioxide,
        "total sulfur dioxide": wine.total_sulfur_dioxide,
        "density": wine.density,
        "pH": wine.pH,
        "sulphates": wine.sulphates, 
        "alcohol": wine.alcohol
    }
    scaled_array =  scaler.transform(pd.DataFrame(input_data, index=[0])).reshape(1, -1)
    result = model.predict(scaled_array)

    return {
        "wine_quality": "good" if result == 1 else "bad"
    }
