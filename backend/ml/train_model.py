import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "PhiUSIIL_Phishing_URL_Dataset.csv"
)

MODEL_DIR = os.path.join(
    BASE_DIR,
    "models"
)

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "phishing_url_model.pkl"
)


# ==========================================
# URL-AVAILABLE FEATURES
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
# LOAD DATASET
# ==========================================

print("Loading dataset...")

df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")

print(
    f"Total rows: {len(df)}"
)

print(
    f"Total columns: {len(df.columns)}"
)


# ==========================================
# CHECK FEATURES
# ==========================================

print("\nChecking selected features...")

missing_features = [
    feature
    for feature in FEATURE_COLUMNS
    if feature not in df.columns
]

if missing_features:

    print(
        "ERROR: Missing features:"
    )

    print(
        missing_features
    )

    raise ValueError(
        "Some selected features do not exist in the dataset."
    )


# ==========================================
# PREPARE DATA
# ==========================================

X = df[
    FEATURE_COLUMNS
]

y = df[
    "label"
]


print(
    f"\nFeatures selected: {len(FEATURE_COLUMNS)}"
)

print(
    f"X shape: {X.shape}"
)

print(
    f"y shape: {y.shape}"
)


# ==========================================
# TRAIN / TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.20,

    random_state=42,

    stratify=y

)


print(
    f"\nTraining samples: {len(X_train)}"
)

print(
    f"Testing samples: {len(X_test)}"
)


# ==========================================
# TRAIN RANDOM FOREST
# ==========================================

print(
    "\nTraining Random Forest model..."
)


model = RandomForestClassifier(

    n_estimators=200,

    random_state=42,

    n_jobs=-1,

    class_weight="balanced"

)


model.fit(

    X_train,

    y_train

)


print(
    "Model training completed!"
)


# ==========================================
# PREDICTION
# ==========================================

y_pred = model.predict(

    X_test

)


# ==========================================
# MODEL PERFORMANCE
# ==========================================

accuracy = accuracy_score(

    y_test,

    y_pred

)


print(
    "\n=============================="
)

print(
    "MODEL PERFORMANCE"
)

print(
    "=============================="
)


print(
    f"Accuracy: {accuracy * 100:.2f}%"
)


print(
    "\nClassification Report:"
)


print(
    classification_report(

        y_test,

        y_pred

    )
)


print(
    "\nConfusion Matrix:"
)


print(
    confusion_matrix(

        y_test,

        y_pred

    )
)


# ==========================================
# SAVE MODEL
# ==========================================

os.makedirs(

    MODEL_DIR,

    exist_ok=True

)


joblib.dump(

    model,

    MODEL_PATH

)


print(
    "\n=============================="
)

print(
    "Model saved successfully!"
)

print(
    f"Location: {MODEL_PATH}"
)

print(
    "=============================="
)