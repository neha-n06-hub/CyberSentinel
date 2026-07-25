from urllib.parse import urlparse
import ipaddress
import re


# Known URL shortening services
SHORTENED_DOMAINS = {
    "bit.ly",
    "tinyurl.com",
    "t.co",
    "goo.gl",
    "is.gd",
    "ow.ly",
    "buff.ly",
}


# Words commonly associated with phishing attempts
SUSPICIOUS_KEYWORDS = {
    "login",
    "verify",
    "verification",
    "account",
    "update",
    "secure",
    "security",
    "password",
    "signin",
    "confirm",
    "bank",
    "wallet",
}


def extract_features(url: str):

    parsed_url = urlparse(url)

    domain = parsed_url.netloc.lower()

    # Remove port number
    clean_domain = domain.split(":")[0]

    path = parsed_url.path

    # -----------------------------------
    # IP ADDRESS CHECK
    # -----------------------------------

    try:
        ipaddress.ip_address(clean_domain)
        has_ip = 1

    except ValueError:
        has_ip = 0


    # -----------------------------------
    # BASIC LENGTH FEATURES
    # -----------------------------------

    url_length = len(url)

    domain_length = len(clean_domain)

    path_length = len(path)


    # -----------------------------------
    # DOMAIN STRUCTURE
    # -----------------------------------

    domain_parts = clean_domain.split(".")

    if len(domain_parts) > 2:

        subdomain_count = len(domain_parts) - 2

    else:

        subdomain_count = 0


    # -----------------------------------
    # CHARACTER COUNTS
    # -----------------------------------

    digit_count = sum(
        character.isdigit()
        for character in url
    )

    domain_digit_count = sum(
        character.isdigit()
        for character in clean_domain
    )

    hyphen_count = clean_domain.count("-")

    dot_count = url.count(".")

    special_character_count = len(
        re.findall(r"[^a-zA-Z0-9]", url)
    )


    # -----------------------------------
    # HTTPS CHECK
    # -----------------------------------

    has_https = int(
        parsed_url.scheme.lower() == "https"
    )


    # -----------------------------------
    # @ SYMBOL CHECK
    # -----------------------------------

    has_at_symbol = int(
        "@" in url
    )


    # -----------------------------------
    # URL SHORTENER CHECK
    # -----------------------------------

    is_shortened_url = int(
        clean_domain in SHORTENED_DOMAINS
    )


    # -----------------------------------
    # SUSPICIOUS KEYWORD CHECK
    # -----------------------------------

    url_lower = url.lower()

    suspicious_keyword_count = sum(
        keyword in url_lower
        for keyword in SUSPICIOUS_KEYWORDS
    )


    # -----------------------------------
    # HYPHEN CHECK
    # -----------------------------------

    has_hyphen = int(
        "-" in clean_domain
    )


    # -----------------------------------
    # RETURN FEATURES
    # -----------------------------------

    return {

        "url_length": url_length,

        "domain_length": domain_length,

        "path_length": path_length,

        "has_ip": has_ip,

        "has_https": has_https,

        "has_at_symbol": has_at_symbol,

        "subdomain_count": subdomain_count,

        "digit_count": digit_count,

        "domain_digit_count": domain_digit_count,

        "hyphen_count": hyphen_count,

        "has_hyphen": has_hyphen,

        "dot_count": dot_count,

        "special_character_count": special_character_count,

        "is_shortened_url": is_shortened_url,

        "suspicious_keyword_count": suspicious_keyword_count,

    }