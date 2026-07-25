import re


def analyze_password(password: str):

    score = 0
    reasons = []

    # Length
    if len(password) >= 12:
        score += 25
    elif len(password) >= 8:
        score += 15
    else:
        reasons.append("Password is too short.")

    # Uppercase
    if re.search(r"[A-Z]", password):
        score += 15
    else:
        reasons.append("Missing uppercase letter.")

    # Lowercase
    if re.search(r"[a-z]", password):
        score += 15
    else:
        reasons.append("Missing lowercase letter.")

    # Numbers
    if re.search(r"\d", password):
        score += 15
    else:
        reasons.append("Missing number.")

    # Special characters
    if re.search(r"[^A-Za-z0-9]", password):
        score += 20
    else:
        reasons.append("Missing special character.")

    # Common weak passwords
    common_passwords = [
        "password",
        "123456",
        "12345678",
        "qwerty",
        "admin",
        "password123"
    ]

    if password.lower() in common_passwords:
        score = 10
        reasons.append("This is a commonly used password.")

    # Risk level
    if score >= 80:
        strength = "STRONG"
        risk_level = "LOW"
    elif score >= 50:
        strength = "MEDIUM"
        risk_level = "MEDIUM"
    else:
        strength = "WEAK"
        risk_level = "HIGH"

    return {
        "password_length": len(password),
        "score": score,
        "strength": strength,
        "risk_level": risk_level,
        "reasons": reasons
    }