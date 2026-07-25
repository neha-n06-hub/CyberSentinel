from typing import Dict, List


# Ports that are commonly considered higher risk
HIGH_RISK_PORTS = {
    21: "FTP",
    23: "Telnet",
    445: "SMB",
    3389: "RDP",
}


def calculate_risk_score(
    open_ports: List[Dict]
) -> int:
    """
    Calculate a basic network exposure risk score.
    """

    score = 0

    # Add risk for each open port
    score += len(open_ports) * 5

    # Add extra risk for high-risk services
    for port_info in open_ports:

        port = port_info.get("port")

        if port in HIGH_RISK_PORTS:
            score += 15

    # Keep score between 0 and 100
    return min(score, 100)


def get_risk_level(
    risk_score: int
) -> str:
    """
    Convert risk score into a risk level.
    """

    if risk_score >= 70:
        return "HIGH"

    elif risk_score >= 40:
        return "MEDIUM"

    else:
        return "LOW"


def generate_security_findings(
    open_ports: List[Dict]
) -> List[str]:
    """
    Generate security findings based
    on detected open ports.
    """

    findings = []

    for port_info in open_ports:

        port = port_info.get("port")
        service = port_info.get(
            "service",
            "Unknown"
        )

        if port == 21:

            findings.append(
                "FTP service is exposed. "
                "Consider using secure file transfer protocols."
            )

        elif port == 23:

            findings.append(
                "Telnet service is exposed. "
                "Telnet transmits data insecurely."
            )

        elif port == 445:

            findings.append(
                "SMB service is exposed. "
                "Ensure SMB access is restricted."
            )

        elif port == 3389:

            findings.append(
                "RDP service is exposed. "
                "Use strong authentication and restrict access."
            )

        elif port == 3306:

            findings.append(
                "MySQL database port is exposed. "
                "Restrict database access to trusted hosts."
            )

        elif port == 5432:

            findings.append(
                "PostgreSQL database port is exposed. "
                "Restrict database access to trusted hosts."
            )

        else:

            findings.append(
                f"{service} service detected "
                f"on port {port}."
            )

    if not open_ports:

        findings.append(
            "No common open ports were detected."
        )

    return findings


def analyze_network_scan(
    scan_result: Dict
) -> Dict:
    """
    Analyze network scan results
    and generate a security assessment.
    """

    if not scan_result.get("success"):

        return {
            "success": False,
            "error": scan_result.get(
                "error",
                "Network scan failed"
            ),
        }

    open_ports = scan_result.get(
        "open_ports",
        []
    )

    risk_score = calculate_risk_score(
        open_ports
    )

    risk_level = get_risk_level(
        risk_score
    )

    findings = generate_security_findings(
        open_ports
    )

    return {
        "success": True,
        "target": scan_result.get(
            "target"
        ),
        "ip_address": scan_result.get(
            "ip_address"
        ),
        "open_ports": open_ports,
        "open_port_count": len(
            open_ports
        ),
        "risk_score": risk_score,
        "risk_level": risk_level,
        "findings": findings,
        "is_exposed": len(
            open_ports
        ) > 0,
    }