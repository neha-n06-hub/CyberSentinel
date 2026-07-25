from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

from .analyzer import analyze_traffic


router = APIRouter(
    prefix="/api/traffic",
    tags=["Traffic Analysis"]
)


# ==========================================
# REQUEST MODEL
# ==========================================

class TrafficAnalysisRequest(BaseModel):
    packets: List[Dict]


# ==========================================
# TRAFFIC ANALYSIS ENDPOINT
# ==========================================

@router.post("/analyze")
def analyze_network_traffic(
    request: TrafficAnalysisRequest
):

    result = analyze_traffic(
        request.packets
    )

    return result