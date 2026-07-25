from urllib.parse import urlparse
import ipaddress
import re


def extract_ml_features(url: str):

    parsed = urlparse(url)

    domain = parsed.netloc.lower().split(":")[0]

    path = parsed.path

    # ==========================================
    # BASIC URL FEATURES
    # ==========================================

    url_length = len(url)

    domain_length = len(domain)

    # ==========================================
    # IP ADDRESS
    # ==========================================

    try:
        ipaddress.ip_address(domain)
        is_domain_ip = 1

    except ValueError:
        is_domain_ip = 0

    # ==========================================
    # SUBDOMAIN COUNT
    # ==========================================

    domain_parts = domain.split(".")

    if len(domain_parts) > 2:
        no_of_subdomain = len(domain_parts) - 2
    else:
        no_of_subdomain = 0

    # ==========================================
    # TLD
    # ==========================================

    if "." in domain:
        tld = domain.split(".")[-1]
    else:
        tld = ""

    tld_length = len(tld)

    # ==========================================
    # CHARACTER COUNTS
    # ==========================================

    no_of_letters = sum(
        c.isalpha() for c in url
    )

    no_of_digits = sum(
        c.isdigit() for c in url
    )

    no_of_equals = url.count("=")

    no_of_qmark = url.count("?")

    no_of_ampersand = url.count("&")

    no_of_special_chars = len(
        re.findall(r"[^a-zA-Z0-9]", url)
    )

    # ==========================================
    # RATIOS
    # ==========================================

    letter_ratio = (
        no_of_letters / url_length
        if url_length > 0
        else 0
    )

    digit_ratio = (
        no_of_digits / url_length
        if url_length > 0
        else 0
    )

    special_char_ratio = (
        no_of_special_chars / url_length
        if url_length > 0
        else 0
    )

    # ==========================================
    # OBFUSCATION
    # ==========================================

    obfuscated_chars = len(
        re.findall(
            r"%[0-9a-fA-F]{2}",
            url
        )
    )

    has_obfuscation = int(
        obfuscated_chars > 0
    )

    obfuscation_ratio = (
        obfuscated_chars / url_length
        if url_length > 0
        else 0
    )

    # ==========================================
    # HTTPS
    # ==========================================

    is_https = int(
        parsed.scheme.lower() == "https"
    )

    # ==========================================
    # URL STRUCTURE
    # ==========================================

    has_at_symbol = int(
        "@" in url
    )

    has_hyphen = int(
        "-" in domain
    )

    # ==========================================
    # RETURN FEATURES
    # ==========================================

    return {

        "URLLength": url_length,

        "DomainLength": domain_length,

        "IsDomainIP": is_domain_ip,

        "TLDLength": tld_length,

        "NoOfSubDomain": no_of_subdomain,

        "HasObfuscation": has_obfuscation,

        "NoOfObfuscatedChar": obfuscated_chars,

        "ObfuscationRatio": obfuscation_ratio,

        "NoOfLettersInURL": no_of_letters,

        "LetterRatioInURL": letter_ratio,

        "NoOfDegitsInURL": no_of_digits,

        "DegitRatioInURL": digit_ratio,

        "NoOfEqualsInURL": no_of_equals,

        "NoOfQMarkInURL": no_of_qmark,

        "NoOfAmpersandInURL": no_of_ampersand,

        "NoOfOtherSpecialCharsInURL": no_of_special_chars,

        "SpacialCharRatioInURL": special_char_ratio,

        "IsHTTPS": is_https,

        "HasObfuscation": has_obfuscation,

        "HasAtSymbol": has_at_symbol,

        "HasHyphen": has_hyphen

    }