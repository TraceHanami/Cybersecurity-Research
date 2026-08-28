import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Linkedin, Rss, Terminal, ExternalLink } from '../common/Icons';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#070a11] text-slate-400 text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-sky-400">TH</span>
              </div>
              <span className="font-semibold text-slate-200 tracking-tight text-sm">TraceHanami Research</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Open cybersecurity research journal, adversary emulation, detection engineering, and laboratory findings.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com/tracehanami" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/tracehanami" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <Link to="/rss" className="text-slate-400 hover:text-amber-400 transition-colors" title="RSS Feed">
                <Rss className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/research" className="hover:text-sky-400 transition-colors">Research Catalog</Link></li>
              <li><Link to="/labs" className="hover:text-sky-400 transition-colors">Research Labs</Link></li>
              <li><Link to="/matrix" className="hover:text-sky-400 transition-colors">MITRE ATT&CK Matrix</Link></li>
              <li><Link to="/pipeline" className="hover:text-sky-400 transition-colors">Research Pipeline</Link></li>
              <li><Link to="/about" className="hover:text-sky-400 transition-colors">About Researcher</Link></li>
            </ul>
          </div>

          {/* Research Domains */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Domains</h4>
            <ul className="space-y-2">
              <li><Link to="/research?category=Blue+Team" className="hover:text-sky-400 transition-colors">🔵 Blue Team & Detection</Link></li>
              <li><Link to="/research?category=Red+Team" className="hover:text-rose-400 transition-colors">🔴 Red Team & Emulation</Link></li>
              <li><Link to="/research?category=Purple+Team" className="hover:text-purple-400 transition-colors">🟣 Purple Team Validation</Link></li>
              <li><Link to="/research?category=Threat+Intelligence" className="hover:text-cyan-400 transition-colors">🌐 Threat Intelligence & Malware</Link></li>
            </ul>
          </div>

          {/* Research Ethics & Security Note */}
          <div>
            <h4 className="font-mono text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Security & PGP</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-2">
              All offensive simulations were conducted within authorized, isolated laboratory networks.
            </p>
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-[10px] text-slate-400 break-all">
              <span className="text-slate-500 block mb-0.5">PGP Fingerprint:</span>
              <span className="text-sky-400">9E7A 3B1F 8C2D 4E6A 1192 8847 C3F0</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} TraceHanami Research. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/rss" className="hover:text-slate-300">RSS Feed</Link>
            <span>•</span>
            <Link to="/about#certifications" className="hover:text-slate-300">Verified Certifications</Link>
            <span>•</span>
            <span>MITRE ATT&CK® v14 Mapped</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
