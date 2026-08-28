export const authorData = {
  name: 'TraceHanami',
  handle: '@tracehanami',
  role: 'Cybersecurity Researcher & Penetration Tester',
  tagline: 'VAPT • Threat Intelligence • Web & Forensics • Security Tooling',
  location: 'Security Research Lab',
  email: 'research@tracehanami.sec',
  pgpKeyId: '0x9E7A3B1F8C2D4E6A',
  pgpFingerprint: '9E7A 3B1F 8C2D 4E6A 1192 8847 C3F0 E189 7D24 5B90',
  socials: {
    github: 'https://github.com/tracehanami',
    linkedin: 'https://linkedin.com/in/tracehanami',
    twitter: 'https://twitter.com/tracehanami',
    rss: '/rss.xml'
  },
  biography: `TraceHanami is an active cybersecurity researcher and penetration tester specializing in vulnerability assessment and penetration testing (VAPT), practical web exploitation, threat intelligence investigations, and digital forensics. 

With direct experience evaluating serverless cloud databases (Firebase / Cloud Firestore), reversing proprietary sports and IoT kinematic telemetry protocols, and conducting multi-engine OSINT forensics (ZeroFox, VirusTotal, Shodan), TraceHanami emphasizes reproducible technical writeups, transparent proof-of-concepts, and robust remediation engineering.`,
  
  areasOfInterest: [
    'Vulnerability Assessment & Penetration Testing (VAPT)',
    'Cloud Security & Serverless DB Access Control (Firebase / Firestore / GCP)',
    'Threat Intelligence & Social Engineering Lure Forensics (ZeroFox / Shodan / VirusTotal)',
    'Digital Forensics, Steganography & Binary File Structure (LSB, JPEG MCUs, SOF0)',
    'Web Application Security & HTTP Header Hardening (CSP, CORS, HSTS)',
    'Protocol Reverse Engineering & Sensor Telemetry Analysis',
    'Automated Security Audit Tooling & Reproducible Bash/Python POCs'
  ],

  publications: [
    {
      title: 'VAPT Report: Black-Box Assessment of Firebase & Next.js Hackathon Infrastructure',
      venue: 'VAPT Security Assessment Archive',
      year: '2026',
      link: '/research/vapt-report-ailabsiet-hackathon-portal'
    },
    {
      title: 'Threat Intelligence Report: Living-off-the-Platform Instagram Reel Phishing Investigation',
      venue: 'Cyber Threat Intelligence Journal (SEC-IR-2026-0827-01)',
      year: '2026',
      link: '/research/threat-intel-instagram-reel-phishing-investigation'
    },
    {
      title: 'Forensics: Nested LSB Steganography & Spatial Reconstruction (Story of Captain Levi)',
      venue: 'TomCTF Forensics Archive',
      year: '2026',
      link: '/research/story-of-captain-levi-nested-lsb-steganography'
    },
    {
      title: 'Web & Reversing: Exploiting Manipulated VAR Sensor Telemetry (Offside 11mm)',
      venue: 'z0d1ak CTF Web / Reversing Archive',
      year: '2026',
      link: '/research/offside-11mm-hydra-fc-var-telemetry-web-reversing'
    }
  ],

  githubActivity: {
    totalContributions: '1,420+ commits this year',
    publicRepos: '26 security toolkits & research repos',
    starsEarned: '480+ stars',
    recentProjects: [
      { name: 'VAPT-Automation-Suite', desc: 'Automated vulnerability test orchestration and PDF reporting generator', lang: 'Bash / Python' },
      { name: 'Phish-IOC-Correlator', desc: 'Multi-engine OSINT (VirusTotal, ZeroFox, Shodan) campaign tracker', lang: 'Python' },
      { name: 'SecureAccess', desc: 'Lightweight biometric and multi-factor authentication security toolkit', lang: 'Python' },
      { name: 'CTF-Writeups-Archive', desc: 'Curated repository of intermediate forensics, crypto, reversing, and web writeups', lang: 'Markdown / Python' }
    ]
  }
};
