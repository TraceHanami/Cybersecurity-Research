export const kanbanData = {
  researching: [
    {
      id: 'k-vapt-1',
      title: 'Automated VAPT CI/CD Pipeline & GitHub Action Security Gate',
      description: 'Developing automated test runner that verifies Firebase Firestore Security Rules and Next.js public bundles on each pull request.',
      tags: ['VAPT', 'CI/CD', 'AppSec'],
      targetDate: 'Q4 2026',
      progress: 70,
      mitre: 'T1190 / TA0001'
    },
    {
      id: 'k-1',
      title: 'Windows Event Correlation & Parent-Child RPC Trees',
      description: 'Building graph-based detection models for ALPC/RPC communication between svchost.exe instances and anomalous child processes.',
      tags: ['RPC Telemetry', 'Graph Analysis', 'Blue Team'],
      targetDate: 'Q4 2026',
      progress: 65,
      mitre: 'T1047 / T1055'
    },
    {
      id: 'k-2',
      title: 'AI Threat Hunting Framework with Local Small-Language Models',
      description: 'Evaluating SLMs (Mistral-7B, Llama-3-8B) for zero-shot Zeek network log anomaly scoring without sending telemetry offsite.',
      tags: ['AI Security', 'Threat Hunting', 'eBPF'],
      targetDate: 'Q4 2026',
      progress: 40,
      mitre: 'TA0007 / TA0010'
    }
  ],
  writing: [
    {
      id: 'k-threat-2',
      title: 'Social Media Threat Intelligence: Tracking Living-off-the-Platform Phishing',
      description: 'Documenting multi-engine detection playbooks (ZeroFox + VirusTotal + Shodan) for social engineering lures delivered over CDN infrastructure.',
      tags: ['Threat Intel', 'OSINT', 'Phishing'],
      targetDate: 'Sept 2026',
      progress: 90,
      mitre: 'T1566.002'
    },
    {
      id: 'k-4',
      title: 'Sigma Rule Engineering: Defeating Obfuscation with Semantic ASTs',
      description: 'Drafting deep-dive guide on writing evasion-resistant Sigma rules leveraging PowerShell AST, AMSI telemetry, and process lineage.',
      tags: ['Sigma Rules', 'Detection Engineering'],
      targetDate: 'Sept 2026',
      progress: 85,
      mitre: 'T1059.001'
    }
  ],
  published: [
    {
      id: 'k-pub-vapt',
      title: 'SIET AI Lab Hackathon Portal VAPT Report',
      description: 'Published 4 Critical vulnerability assessment on Firestore security rules, exposed API keys, and IDOR vectors.',
      tags: ['VAPT', 'Firebase', 'Published'],
      date: 'Aug 2026',
      slug: 'vapt-report-ailabsiet-hackathon-portal',
      mitre: 'T1190 / T1078.004'
    },
    {
      id: 'k-pub-threat',
      title: 'Instagram Reel Phishing Investigation (SEC-IR-2026-0827-01)',
      description: 'Published threat intelligence investigation on ZeroFox-flagged social media credential harvesting lures.',
      tags: ['Threat Intel', 'Phishing', 'Published'],
      date: 'Aug 2026',
      slug: 'threat-intel-instagram-reel-phishing-investigation',
      mitre: 'T1566.002'
    },
    {
      id: 'k-8',
      title: 'Detecting Kerberoasting with Windows Event Logs',
      description: 'Comprehensive analysis of Kerberos TGS Ticket encryption downgrades, Event 4769 anomalies, and resilient Sigma rules.',
      tags: ['Kerberoasting', 'Detection Engineering', 'Published'],
      date: 'Aug 2026',
      slug: 'detecting-kerberoasting-windows-event-logs',
      mitre: 'T1558.003'
    }
  ]
};
