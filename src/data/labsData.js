export const labsData = [
  {
    id: 'lab-vapt-cloud-appsec',
    slug: 'hackathon-vapt-range',
    title: 'Cloud AppSec & Firebase VAPT Assessment Range',
    category: 'VAPT / Cloud AppSec',
    status: 'Operational',
    nodesCount: 6,
    telemetryRate: '~1.2k Requests/Audit',
    summary: 'A complete black-box and grey-box web penetration testing lab modeling serverless single-page applications (Next.js App Router, Vercel edge runtime, Google Cloud Firestore, and Firebase Authentication).',
    purpose: 'Simulate API key exposure, open OAuth/email self-registration, IDOR testing, Firestore database rule bypasses, CSP policy evasion, and automated test orchestration using custom bash/python suites.',
    technologies: [
      'Next.js 14 / App Router',
      'Google Cloud Firestore REST API',
      'Firebase Identity Toolkit v1',
      'Cloudflare CDN & Edge Proxy',
      'ReportLab PDF Generation Suite',
      'Curl / Python3 Automation Suite',
      'Burp Suite Professional'
    ],
    architecture: {
      targetApp: 'SIET AI Lab Hackathon Portal (ailabsiet.dpdns.org)',
      backendDB: 'Google Cloud Firestore (hackathon-website-6f5b9)',
      authProvider: 'Firebase Identity Toolkit (Email/Password endpoints)',
      proxyEdge: 'Cloudflare Free Tier with TLS 1.3 & HSTS',
      auditingNodes: ['Local Security Audit Runner (test_all_vulnerabilities.sh)', 'Headless PDF Report Compiler']
    },
    researchFindings: [
      'Proven that default Firestore rules (allow read, write: if true) grant full write/delete capabilities to any self-registered JWT token.',
      'Demonstrated complete IDOR exploitation across /users, /hackathons, and /submissions collections without requiring elevated privileges.',
      'Constructed automated non-destructive audit script that tests and cleans up test records in under 3 seconds.'
    ],
    detectionOpportunities: [
      { tactic: 'Initial Access', technique: 'T1190 Exploit Public-Facing Application', rule: 'GCP Audit Logs: MethodName Write/Commit on /documents/admin' },
      { tactic: 'Credential Access', technique: 'T1552 Unsecured Credentials', rule: 'YARA Rule: Cleartext Firebase API Key Extractor' },
      { tactic: 'Persistence', technique: 'T1098 Account Manipulation', rule: 'Firestore Rule: Block role attribute self-patching' }
    ]
  },
  {
    id: 'lab-threat-intel-osint',
    slug: 'threat-intel-investigation-workbench',
    title: 'Threat Intelligence & Phishing Forensic Workbench',
    category: 'Threat Intel / OSINT',
    status: 'Operational',
    nodesCount: 4,
    telemetryRate: 'Multi-Feed Ingestion',
    summary: 'A unified threat intelligence triage environment correlating multi-engine telemetry from VirusTotal API, ZeroFox Social Threat Intelligence, Shodan host telemetry, and ASN BGP routing analysis.',
    purpose: 'Investigate live social engineering campaigns, credential harvesting lures, and Living-off-the-Platform abuse across major social platforms and CDN distribution nodes.',
    technologies: [
      'VirusTotal v3 Intelligence API',
      'ZeroFox Social Media Threat Intelligence',
      'Shodan Host & SSL/TLS Telemetry',
      'Meta AS32934 BGP / Edge Analyzers',
      'Wireshark / Scapy / Burp Suite Pro',
      'Zeek Network Security Monitor'
    ],
    architecture: {
      multiEngineFeeds: ['VirusTotal 92-Vendor URL Scanner', 'ZeroFox Social Threat Feed'],
      reconSensors: ['Shodan Internet-wide Scanner', 'BGP ASN Routing Tables (AS32934)'],
      sandboxLayer: ['Isolated URL Redirection Tracer', 'Decoded Share-Tag Parameter Analyzer (igsi)']
    },
    researchFindings: [
      'Identified that 98.9% of conventional AV vendors give clean verdicts on legitimate CDN nodes while ZeroFox accurately flags social engineering campaigns.',
      'Mapped five-stage Living-off-the-Platform attack chain abusing legitimate Instagram Reel delivery to spread credential harvest lures.',
      'Designed Zeek and Sigma signatures for detecting campaign referral tracking tags (igsi) in enterprise proxy egress.'
    ],
    detectionOpportunities: [
      { tactic: 'Initial Access', technique: 'T1566.002 Spearphishing Link', rule: 'Zeek / Proxy: URL query contains igsi=' },
      { tactic: 'Credential Access', technique: 'T1078 Valid Accounts', rule: 'Meta Accounts Center: Simultaneous foreign IP session creation' }
    ]
  },
  {
    id: 'lab-ctf-forensics-workbench',
    slug: 'ctf-forensics-reversing-workbench',
    title: 'Steganography, Forensics & Protocol Reversing Lab',
    category: 'Forensics & Reverse Engineering',
    status: 'Operational',
    nodesCount: 3,
    telemetryRate: 'Offline Artifact Analysis',
    summary: 'A dedicated CTF digital forensics and reverse engineering testbed equipped for binary header reconstruction, nested LSB stego parsing, spatial fragmentation reversal, and sensor telemetry analysis.',
    purpose: 'Solving real-world and competition forensics challenges involving custom file headers, JPEG SOF0 markers, kinematic sensor stream fusion, and transposition ciphers.',
    technologies: [
      'Python 3 (NumPy, Pillow, struct, urllib)',
      'AperiSolve & StegSolve',
      'zsteg / ExifTool / binwalk',
      'Ghex / hexeditor',
      'GDB / Ghidra',
      'Wireshark & Scapy'
    ],
    architecture: {
      imageAnalysisNodes: ['Bitplane LSB Stream Splitters', 'JPEG MCU & Start-of-Frame Marker Patchers'],
      protocolSensors: ['Kinematic Telemetry Solvers (FLOAT-VAR-3.1 specification parser)'],
      cryptoEngines: ['Columnar Transposition Solvers & Side-Channel Decoders']
    },
    researchFindings: [
      'Demonstrated 100% flag recovery on nested LSB multi-layer steganography challenges using nearest-neighbor pixel preservation.',
      'Authored automated differential telemetry solvers capable of identifying sensor profile shifts in sports telemetry systems.',
      'Constructed automated JPEG SOF0 height patchers resolving boundary truncation challenges.'
    ],
    detectionOpportunities: [
      { tactic: 'Defense Evasion', technique: 'T1027 Obfuscated Files or Information', rule: 'DLP / Content Disarm: LSB non-random entropy scan' },
      { tactic: 'Impact', technique: 'T1565.001 Stored Data Manipulation', rule: 'API Gateway: Calibration profile deviation telemetry' }
    ]
  }
];
