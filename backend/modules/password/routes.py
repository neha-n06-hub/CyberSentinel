from fastapi import APIRouter
from pydantic import BaseModel

from .analyzer import analyze_password


router = APIRouter(
    prefix="/api/password",
    tags=["Password Security"]
)


class PasswordRequest(BaseModel):
    password: str


@router.post("/analyze")
def analyze_password_route(request: PasswordRequest):

    result = analyze_password(request.password)

    return {
        "password_analysis": result
    }