import socket


def scan_target(target: str):
    """
    Basic network scanner.
    Resolves the target hostname and checks common ports.
    """

    common_ports = [
        21,   # FTP
        22,   # SSH
        23,   # Telnet
        25,   # SMTP
        53,   # DNS
        80,   # HTTP
        110,  # POP3
        143,  # IMAP
        443,  # HTTPS
        3306, # MySQL
        3389, # RDP
        8080  # HTTP Alternative
    ]

    try:
        ip_address = socket.gethostbyname(target)

    except socket.gaierror:
        return {
            "target": target,
            "status": "error",
            "message": "Unable to resolve target hostname."
        }

    open_ports = []

    for port in common_ports:

        sock = socket.socket(
            socket.AF_INET,
            socket.SOCK_STREAM
        )

        sock.settimeout(0.5)

        result = sock.connect_ex(
            (ip_address, port)
        )

        if result == 0:
            open_ports.append(port)

        sock.close()

    return {
        "target": target,
        "ip_address": ip_address,
        "status": "success",
        "open_ports": open_ports,
        "scanned_ports": common_ports
    }