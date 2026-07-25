from fastapi import APIRouter, UploadFile, File, HTTPException

from .analyzer import analyze_file


# ==========================================
# CREATE ROUTER
# ==========================================

router = APIRouter(
    prefix="/api/file",
    tags=["File Security"]
)


# ==========================================
# FILE ANALYSIS ENDPOINT
# ==========================================

@router.post("/analyze")
async def analyze_uploaded_file(
    file: UploadFile = File(...)
):

    # --------------------------------------
    # CHECK FILE NAME
    # --------------------------------------

    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="Invalid file name."
        )


    # --------------------------------------
    # READ FILE
    # --------------------------------------

    file_content = await file.read()


    # --------------------------------------
    # GET FILE SIZE
    # --------------------------------------

    file_size = len(file_content)


    # --------------------------------------
    # ANALYZE FILE
    # --------------------------------------

    result = analyze_file(
        filename=file.filename,
        file_size=file_size
    )


    # --------------------------------------
    # RETURN RESULT
    # --------------------------------------

    return {
        "status": "success",
        "analysis": result
    }