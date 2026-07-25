from fastapi import APIRouter
from pydantic import BaseModel

from .analyzer import analyze_url
from .features import extract_features
from ml.predict import predict_url


# ==========================================
# CREATE API ROUTER
# ==========================================

router = APIRouter(
    prefix="/api/phishing",
    tags=["Phishing Detection"]
)


# ==========================================
# REQUEST MODEL
# ==========================================

class URLRequest(BaseModel):
    url: str


# ==========================================
# CALCULATE FINAL RISK
# ==========================================

def calculate_final_risk(
    rule_score: int,
    ml_probability: float
):

    # ==========================================
    # WEIGHTS
    # ==========================================

    rule_weight = 0.60
    ml_weight = 0.40


    # ==========================================
    # COMBINED SCORE
    # ==========================================

    final_score = (
        rule_score * rule_weight
        + ml_probability * ml_weight
    )

    final_score = round(
        final_score
    )


    # ==========================================
    # SECURITY OVERRIDE
    # ==========================================

    # If the rule-based engine already identifies
    # significant suspicious behavior, do not allow
    # the ML model to reduce the risk below MEDIUM.

    if rule_score >= 40 and final_score < 40:

        final_score = 40


    # ==========================================
    # DETERMINE RISK LEVEL
    # ==========================================

    if final_score >= 70:

        risk_level = "HIGH"

    elif final_score >= 40:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"


    # ==========================================
    # SUSPICIOUS STATUS
    # ==========================================

    is_suspicious = (
        final_score >= 40
    )


    # ==========================================
    # RETURN RESULT
    # ==========================================

    return {

        "risk_score": final_score,

        "risk_level": risk_level,

        "is_suspicious": is_suspicious

    }

    # Rule-based system weight
    rule_weight = 0.60

    # Machine learning weight
    ml_weight = 0.40

    # Calculate combined score
    final_score = (
        rule_score * rule_weight
        + ml_probability * ml_weight
    )

    # Round score
    final_score = round(
        final_score
    )

    # Determine risk level
    if final_score >= 70:

        risk_level = "HIGH"

    elif final_score >= 40:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    # Determine suspicious status
    is_suspicious = (
        final_score >= 40
    )

    return {
        "risk_score": final_score,
        "risk_level": risk_level,
        "is_suspicious": is_suspicious
    }


# ==========================================
# ANALYZE URL ENDPOINT
# ==========================================

@router.post("/analyze")
def analyze_phishing_url(
    request: URLRequest
):

    # ======================================
    # RULE-BASED ANALYSIS
    # ======================================

    rule_result = analyze_url(
        request.url
    )


    # ======================================
    # URL FEATURES
    # ======================================

    features = extract_features(
        request.url
    )


    # ======================================
    # MACHINE LEARNING ANALYSIS
    # ======================================

    ml_result = predict_url(
        request.url
    )


    # ======================================
    # EXTRACT SCORES
    # ======================================

    rule_score = rule_result.get(
        "risk_score",
        0
    )

    ml_probability = float(
        ml_result.get(
            "phishing_probability",
            0
        )
    )


    # ======================================
    # FINAL RISK CALCULATION
    # ======================================

    final_risk = calculate_final_risk(
        rule_score,
        ml_probability
    )


    # ======================================
    # FINAL RESPONSE
    # ======================================

    return {

        "url": request.url,

        "final_assessment": final_risk,

        "rule_based_analysis": rule_result,

        "ml_analysis": ml_result,

        "features": features

    }