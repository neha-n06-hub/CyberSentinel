from fastapi import APIRouter
from pydantic import BaseModel

from .analyzer import calculate_unified_risk


# ==========================================
# CREATE ROUTER
# ==========================================

router = APIRouter(

    prefix="/api/risk",

    tags=["Unified Risk Engine"]

)


# ==========================================
# REQUEST MODEL
# ==========================================

class RiskRequest(BaseModel):

    phishing_score: int

    network_score: int

    traffic_score: int

    file_score: int

    password_score: int


# ==========================================
# UNIFIED RISK ANALYSIS
# ==========================================

@router.post("/analyze")

def analyze_unified_risk(

    request: RiskRequest

):

    result = calculate_unified_risk(

        phishing_score=request.phishing_score,

        network_score=request.network_score,

        traffic_score=request.traffic_score,

        file_score=request.file_score,

        password_score=request.password_score

    )


    return {

        "status": "success",

        "analysis": result

    }