from urllib.parse import urlparse
import ipaddress


def analyze_url(url: str):
    parsed_url = urlparse(url)

    domain = parsed_url.netloc
    path = parsed_url.path

    risk_score = 0
    reasons = []

    # Check 1: URL uses an IP address instead of a domain
    try:
        ipaddress.ip_address(domain)
        risk_score += 30
        reasons.append("URL uses an IP address instead of a domain name")
    except ValueError:
        pass

    # Check 2: URL contains @ symbol
    if "@" in url:
        risk_score += 25
        reasons.append("URL contains an @ symbol")

    # Check 3: URL is unusually long
    if len(url) > 75:
        risk_score += 10
        reasons.append("URL is unusually long")

    # Check 4: Too many subdomains
    domain_parts = domain.split(".")

    if len(domain_parts) > 3:
        risk_score += 15
        reasons.append("Domain contains many subdomains")

    # Check 5: URL uses HTTP instead of HTTPS
    if parsed_url.scheme.lower() == "http":
        risk_score += 10
        reasons.append("URL does not use HTTPS")

    # Keep score between 0 and 100
    risk_score = min(risk_score, 100)

    # Determine risk level
    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "url": url,
        "scheme": parsed_url.scheme,
        "domain": domain,
        "path": path,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "is_suspicious": risk_score >= 40,
        "reasons": reasons
    }