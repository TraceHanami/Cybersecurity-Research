export const mitreTactics = [
  {
    id: 'TA0001',
    name: 'Initial Access',
    slug: 'initial-access',
    description: 'Adversary entry vectors into enterprise perimeter or cloud tenants.',
    techniquesCount: 6,
    coveragePercent: 92,
    techniques: [
      { id: 'T1190', name: 'Exploit Public-Facing Application', subtechniques: ['Firebase Rule Bypass', 'Next.js AppSec'], detections: 4, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
      { id: 'T1566.002', name: 'Spearphishing Link', subtechniques: ['Social Media Lure Delivery', 'Living-off-the-Platform'], detections: 6, researchSlug: 'threat-intel-instagram-reel-phishing-investigation' },
      { id: 'T1078.004', name: 'Cloud Accounts', subtechniques: ['Firebase Token Abuse', 'Self-Registration'], detections: 5, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
    ]
  },
  {
    id: 'TA0002',
    name: 'Execution',
    slug: 'execution',
    description: 'Adversary-controlled code execution on local or remote endpoints.',
    techniquesCount: 5,
    coveragePercent: 85,
    techniques: [
      { id: 'T1059', name: 'Command and Scripting Interpreter', subtechniques: ['Python Automation', 'Bash Test Runner'], detections: 8, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
      { id: 'T1204', name: 'User Execution', subtechniques: ['Malicious Lure Interaction'], detections: 4, researchSlug: 'threat-intel-instagram-reel-phishing-investigation' },
    ]
  },
  {
    id: 'TA0003',
    name: 'Persistence',
    slug: 'persistence',
    description: 'Mechanisms to maintain access across restarts or credential changes.',
    techniquesCount: 4,
    coveragePercent: 80,
    techniques: [
      { id: 'T1098', name: 'Account Manipulation', subtechniques: ['Role Self-Escalation', 'IDOR Patching'], detections: 4, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
    ]
  },
  {
    id: 'TA0004',
    name: 'Privilege Escalation',
    slug: 'privilege-escalation',
    description: 'Elevating permissions from user context to Administrator.',
    techniquesCount: 4,
    coveragePercent: 88,
    techniques: [
      { id: 'T1078', name: 'Valid Accounts', subtechniques: ['IDOR User Record Overwrite'], detections: 5, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
    ]
  },
  {
    id: 'TA0005',
    name: 'Defense Evasion',
    slug: 'defense-evasion',
    description: 'Techniques used to avoid detection throughout their compromise.',
    techniquesCount: 8,
    coveragePercent: 94,
    techniques: [
      { id: 'T1027', name: 'Obfuscated Files or Information', subtechniques: ['Nested LSB Steganography', 'JPEG SOF0 Truncation', 'Margin Stego'], detections: 9, researchSlug: 'story-of-captain-levi-nested-lsb-steganography' },
      { id: 'T1562', name: 'Impair Defenses', subtechniques: ['Permissive CORS Wildcard', 'Missing CSP Headers'], detections: 4, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
    ]
  },
  {
    id: 'TA0006',
    name: 'Credential Access',
    slug: 'credential-access',
    description: 'Stealing credentials like API keys, tokens, and hashes.',
    techniquesCount: 6,
    coveragePercent: 95,
    techniques: [
      { id: 'T1552', name: 'Unsecured Credentials', subtechniques: ['API Keys in Client JS', 'Hardcoded Admin Emails'], detections: 7, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
      { id: 'T1558', name: 'Steal or Forge Auth Tokens', subtechniques: ['Firebase idToken Interception'], detections: 5, researchSlug: 'threat-intel-instagram-reel-phishing-investigation' },
    ]
  },
  {
    id: 'TA0007',
    name: 'Discovery',
    slug: 'discovery',
    description: 'Observing system and environment details to orient next moves.',
    techniquesCount: 5,
    coveragePercent: 84,
    techniques: [
      { id: 'T1087', name: 'Account Discovery', subtechniques: ['Client JS Email Enumeration'], detections: 6, researchSlug: 'vapt-report-ailabsiet-hackathon-portal' },
    ]
  },
  {
    id: 'TA0011',
    name: 'Impact',
    slug: 'impact',
    description: 'Manipulating, interrupting, or destroying systems and data.',
    techniquesCount: 4,
    coveragePercent: 75,
    techniques: [
      { id: 'T1565.001', name: 'Stored Data Manipulation', subtechniques: ['Submission Score Tampering', 'Sensor Calibration Manipulation'], detections: 6, researchSlug: 'offside-11mm-hydra-fc-var-telemetry-web-reversing' },
    ]
  }
];
