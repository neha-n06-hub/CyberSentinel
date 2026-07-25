import os


# ==========================================
# SUSPICIOUS FILE EXTENSIONS
# ==========================================

SUSPICIOUS_EXTENSIONS = {
    ".exe",
    ".dll",
    ".bat",
    ".cmd",
    ".scr",
    ".vbs",
    ".js",
    ".ps1",
    ".msi",
    ".jar",
}


# ==========================================
# ANALYZE FILE
# ==========================================

def analyze_file(
    filename: str,
    file_size: int
):

    risk_score = 0
    reasons = []

    # --------------------------------------
    # FILE EXTENSION
    # --------------------------------------

    extension = os.path.splitext(filename)[1].lower()

    if extension in SUSPICIOUS_EXTENSIONS:

        risk_score += 40

        reasons.append(
            f"Potentially risky file extension detected: {extension}"
        )


    # --------------------------------------
    # FILE SIZE CHECK
    # --------------------------------------

    # Files larger than 50 MB receive
    # additional risk points

    if file_size > 50 * 1024 * 1024:

        risk_score += 20

        reasons.append(
            "File size is unusually large."
        )


    # --------------------------------------
    # DOUBLE EXTENSION CHECK
    # --------------------------------------

    filename_parts = filename.lower().split(".")

    if len(filename_parts) >= 3:

        risk_score += 30

        reasons.append(
            "Multiple file extensions detected. "
            "This may indicate a disguised file."
        )


    # --------------------------------------
    # LIMIT SCORE
    # --------------------------------------

    risk_score = min(
        risk_score,
        100
    )


    # --------------------------------------
    # RISK LEVEL
    # --------------------------------------

    if risk_score >= 70:

        risk_level = "HIGH"

    elif risk_score >= 40:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"


    # --------------------------------------
    # FINAL ASSESSMENT
    # --------------------------------------

    is_suspicious = risk_score >= 40


    # --------------------------------------
    # RETURN RESULT
    # --------------------------------------

    return {

        "filename": filename,

        "file_size": file_size,

        "file_extension": extension,

        "risk_score": risk_score,

        "risk_level": risk_level,

        "is_suspicious": is_suspicious,

        "reasons": reasons,

    }