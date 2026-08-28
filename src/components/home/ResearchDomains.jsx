import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Crosshair, Terminal, Bug, ArrowRight, Layers } from '../common/Icons';

export const ResearchDomains = () => {
  const domains = [
    {
      id: 'vapt-appsec',
      name: 'VAPT & AppSec',
      categoryParam: 'Red Team',
      icon: Terminal,
      accentColor: 'red',
      description: 'Black-box application security assessments, serverless database access controls, authentication bypasses, and IDOR testing.',
      disciplines: ['Cloud DB Security', 'Firestore Security Rules', 'IDOR & Access Control', 'Automated Audit Suites'],
      metrics: '4 Critical Findings • CVSS 9.8',
      highlightRule: 'ailabsiet.dpdns.org, Firebase, Next.js App Router'
    },
    {
      id: 'threat-intel',
      name: 'Threat Intelligence',
      categoryParam: 'Threat Intelligence',
      icon: Bug,
      accentColor: 'cyan',
      description: 'Investigating active phishing lures, living-off-the-platform abuse, credential harvesting campaigns, and multi-engine telemetry correlation.',
      disciplines: ['OSINT Telemetry', 'ZeroFox Abuse Tracking', 'Shodan Edge Scans', 'Incident Response (IR)'],
      metrics: 'Report SEC-IR-2026-0827-01',
      highlightRule: 'VirusTotal 1/92, Meta AS32934, igsi Campaign Tag'
    },
    {
      id: 'digital-forensics',
      name: 'Digital Forensics',
      categoryParam: 'Blue Team',
      icon: Shield,
      accentColor: 'purple',
      description: 'Binary header analysis, nested LSB steganography, spatial quadrant reconstruction, and JPEG MCU alignment manipulation.',
      disciplines: ['Nested Stego Parsing', 'JPEG SOF0 Bounds', 'Bitplane LSB Stream', 'Nearest-Neighbor Scaling'],
      metrics: 'TomCTF Solved • NumPy / Pillow',
      highlightRule: 'Captain Levi, Dimensional Expansion, Broken Timeline'
    },
    {
      id: 'reverse-engineering',
      name: 'Protocol & Web Reversing',
      categoryParam: 'Red Team',
      icon: Layers,
      accentColor: 'blue',
      description: 'Reverse engineering proprietary IoT and sports kinematic telemetry interchange specifications, sensor stream fusion, and API exploit solvers.',
      disciplines: ['Kinematic Spec Reversing', 'Sensor Fusion Audits', 'IMU Differential Math', 'Automated API Solvers'],
      metrics: 'z0d1ak CTF Solved • Python 3',
      highlightRule: 'FLOAT-VAR-3.1, Hydra FC Telemetry Gateway'
    }
  ];

  return (
    <section className="py-20 bg-[#090d16] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            Disciplines & Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Research Domains
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Our research is strictly structured across the core pillars of modern cybersecurity operations.
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((domain) => {
            const Icon = domain.icon;

            const styling = {
              blue: {
                pill: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
                border: 'hover:border-sky-500/50',
                btn: 'text-sky-400 hover:text-sky-300',
                dot: 'bg-sky-400',
              },
              red: {
                pill: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
                border: 'hover:border-rose-500/50',
                btn: 'text-rose-400 hover:text-rose-300',
                dot: 'bg-rose-400',
              },
              purple: {
                pill: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                border: 'hover:border-purple-500/50',
                btn: 'text-purple-400 hover:text-purple-300',
                dot: 'bg-purple-400',
              },
              cyan: {
                pill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
                border: 'hover:border-cyan-500/50',
                btn: 'text-cyan-400 hover:text-cyan-300',
                dot: 'bg-cyan-400',
              }
            }[domain.accentColor];

            return (
              <div
                key={domain.id}
                className={`flex flex-col justify-between p-6 rounded-2xl bg-[#0e1424]/80 border border-slate-800/90 transition-all duration-300 ${styling.border} hover:-translate-y-1 shadow-lg`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg ${styling.pill} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                      {domain.metrics}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {domain.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {domain.description}
                  </p>

                  {/* Sub-disciplines */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-slate-800/70">
                    {domain.disciplines.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full ${styling.dot}`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    to={`/research?category=${encodeURIComponent(domain.categoryParam)}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${styling.btn} transition-colors group`}
                  >
                    <span>Browse {domain.name} Papers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
