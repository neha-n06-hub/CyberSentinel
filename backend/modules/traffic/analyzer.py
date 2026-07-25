from typing import List, Dict


def analyze_traffic(packets: List[Dict]) -> Dict:
    """
    Analyze network traffic packets and identify
    potentially suspicious activity.
    """

    total_packets = len(packets)

    suspicious_packets = []
    threats = []

    for packet in packets:

        source_ip = packet.get("source_ip", "")
        destination_ip = packet.get("destination_ip", "")
        protocol = packet.get("protocol", "")
        destination_port = packet.get("destination_port")

        # -----------------------------------------
        # RULE 1: Suspicious ports
        # -----------------------------------------

        suspicious_ports = [
            21,      # FTP
            23,      # Telnet
            445,     # SMB
            3389,    # RDP
        ]

        if destination_port in suspicious_ports:

            suspicious_packets.append(packet)

            threats.append({
                "type": "Suspicious Port",
                "severity": "Medium",
                "description": (
                    f"Traffic detected on potentially risky port "
                    f"{destination_port}"
                ),
                "source_ip": source_ip,
                "destination_ip": destination_ip,
            })

        # -----------------------------------------
        # RULE 2: Suspicious protocols
        # -----------------------------------------

        suspicious_protocols = [
            "FTP",
            "TELNET",
        ]

        if protocol.upper() in suspicious_protocols:

            suspicious_packets.append(packet)

            threats.append({
                "type": "Suspicious Protocol",
                "severity": "High",
                "description": (
                    f"Potentially insecure protocol detected: "
                    f"{protocol}"
                ),
                "source_ip": source_ip,
                "destination_ip": destination_ip,
            })

    # -----------------------------------------
    # CALCULATE RISK SCORE
    # -----------------------------------------

    if total_packets == 0:

        risk_score = 0

    else:

        risk_score = int(
            (len(suspicious_packets) / total_packets) * 100
        )

    # -----------------------------------------
    # DETERMINE RISK LEVEL
    # -----------------------------------------

    if risk_score >= 70:

        risk_level = "HIGH"

    elif risk_score >= 30:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"

    # -----------------------------------------
    # FINAL RESULT
    # -----------------------------------------

    return {
        "total_packets": total_packets,

        "suspicious_packets": len(
            suspicious_packets
        ),

        "risk_score": risk_score,

        "risk_level": risk_level,

        "threats": threats,

        "status": "analysis_complete",
    }