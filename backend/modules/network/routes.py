from fastapi import APIRouter
from pydantic import BaseModel

from .scanner import scan_target


router = APIRouter(
    prefix="/api/network",
    tags=["Network Reconnaissance"]
)


class NetworkScanRequest(BaseModel):
    target: str


@router.post("/scan")
def network_scan(request: NetworkScanRequest):

    result = scan_target(
        request.target
    )

    return result