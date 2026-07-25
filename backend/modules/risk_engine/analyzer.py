def calculate_unified_risk(
    phishing_score: int,
    network_score: int,
    traffic_score: int,
    file_score: int,
    password_score: int
):

    # ==========================================
    # WEIGHTS
    # ==========================================

    phishing_weight = 0.25
    network_weight = 0.20
    traffic_weight = 0.20
    file_weight = 0.20
    password_weight = 0.15


    # ==========================================
    # CALCULATE WEIGHTED SCORE
    # ==========================================

    overall_score = (

        phishing_score * phishing_weight

        + network_score * network_weight

        + traffic_score * traffic_weight

        + file_score * file_weight

        + password_score * password_weight

    )


    # Round the score

    overall_score = round(
        overall_score
    )


    # ==========================================
    # DETERMINE RISK LEVEL
    # ==========================================

    if overall_score >= 75:

        risk_level = "CRITICAL"

    elif overall_score >= 50:

        risk_level = "HIGH"

    elif overall_score >= 25:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"


    # ==========================================
    # GENERATE RECOMMENDATIONS
    # ==========================================

    recommendations = []


    if phishing_score >= 50:

        recommendations.append(
            "Review suspicious URLs and phishing activity."
        )


    if network_score >= 50:

        recommendations.append(
            "Investigate exposed network services and hosts."
        )


    if traffic_score >= 50:

        recommendations.append(
            "Investigate suspicious network traffic."
        )


    if file_score >= 50:

        recommendations.append(
            "Review suspicious files and potentially dangerous file types."
        )


    if password_score >= 50:

        recommendations.append(
            "Improve password security and use stronger passwords."
        )


    # ==========================================
    # DEFAULT RECOMMENDATION
    # ==========================================

    if not recommendations:

        recommendations.append(
            "No major security risks detected."
        )


    # ==========================================
    # RETURN RESULT
    # ==========================================

    return {

        "overall_score": overall_score,

        "risk_level": risk_level,

        "component_scores": {

            "phishing": phishing_score,

            "network": network_score,

            "traffic": traffic_score,

            "file": file_score,

            "password": password_score

        },

        "recommendations": recommendations

    }