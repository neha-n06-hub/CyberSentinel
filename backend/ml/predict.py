import os
import joblib
import pandas as pd

from .url_ml_features import extract_ml_features


# ==========================================
# MODEL PATH
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "phishing_url_model.pkl"
)


# ==========================================
# LOAD MODEL
# ==========================================

model = joblib.load(
    MODEL_PATH
)


# ==========================================
# FEATURE ORDER
# ==========================================

FEATURE_COLUMNS = [

    "URLLength",
    "DomainLength",
    "IsDomainIP",
    "TLDLength",
    "NoOfSubDomain",

    "HasObfuscation",
    "NoOfObfuscatedChar",
    "ObfuscationRatio",

    "NoOfLettersInURL",
    "LetterRatioInURL",

    "NoOfDegitsInURL",
    "DegitRatioInURL",

    "NoOfEqualsInURL",
    "NoOfQMarkInURL",
    "NoOfAmpersandInURL",

    "NoOfOtherSpecialCharsInURL",
    "SpacialCharRatioInURL",

    "IsHTTPS"

]


# ==========================================
# PREDICT URL
# ==========================================

def predict_url(url: str):

    # Extract features from URL
    features = extract_ml_features(url)

    # Create DataFrame with exact feature order
    input_data = pd.DataFrame(
        [
            {
                feature: features[feature]
                for feature in FEATURE_COLUMNS
            }
        ]
    )

    # Make prediction
    prediction = model.predict(
        input_data
    )[0]

    # Get prediction probabilities
    probabilities = model.predict_proba(
        input_data
    )[0]

    # Probability of phishing
    phishing_probability = probabilities[1]

    # Convert to percentage
    phishing_percentage = round(
        phishing_probability * 100,
        2
    )

    # Determine prediction label
    if prediction == 1:

        prediction_label = "PHISHING"

    else:

        prediction_label = "LEGITIMATE"

    return {

        "prediction": prediction_label,

        "is_phishing": bool(
            prediction == 1
        ),

        "phishing_probability": phishing_percentage

    }


# ==========================================
# TEST MODEL
# ==========================================

if __name__ == "__main__":

    test_url = "https://www.google.com"

    result = predict_url(
        test_url
    )

    print(result)