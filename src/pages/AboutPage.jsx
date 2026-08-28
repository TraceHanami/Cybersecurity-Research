import React from 'react';
import { authorData } from '../data/authorData';
import { Shield, Terminal, Award, BookOpen, Github, Linkedin, Rss, ExternalLink, CheckCircle, Code } from '../components/common/Icons';
import { Link } from 'react-router-dom';

export const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Researcher Profile Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1424] border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-2 border-sky-500/40 flex items-center justify-center font-mono font-bold text-2xl text-sky-400 shadow-lg">
            TH
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {authorData.name}
              </h1>
              <span className="text-xs font-mono text-slate-500">{authorData.handle}</span>
            </div>
            <div className="text-sm font-semibold text-sky-400 mb-1">
              {authorData.role}
            </div>
            <div className="text-xs font-mono text-slate-400">
              {authorData.tagline}
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="text-sm text-slate-300 leading-relaxed space-y-4 mb-8 pt-4 border-t border-slate-800">
          {authorData.biography.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Social and Contact Links */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={authorData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
          </a>
          <a
            href={authorData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-sky-400" />
            <span>LinkedIn Profile</span>
          </a>
          <Link
            to="/rss"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
          >
            <Rss className="w-4 h-4 text-amber-400" />
            <span>RSS Feed</span>
          </Link>
        </div>
      </div>

      {/* Areas of Interest */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-sky-400" />
          <span>Core Research Focus & Technical Specializations</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {authorData.areasOfInterest.map((area, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-[#0e1424] border border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-200 font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Publications & Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* Publications */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>Key Research & VAPT Reports</span>
          </h2>
          <div className="space-y-3">
            {authorData.publications.map((pub, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                <div className="text-xs font-semibold text-white mb-1">
                  {pub.title}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  {pub.venue} • {pub.year}
                </div>
                <Link to={pub.link} className="text-xs text-sky-400 hover:underline">
                  Read Report →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tooling */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-400" />
            <span>Open Source Security Projects</span>
          </h2>
          <div className="space-y-3">
            {authorData.githubActivity.recentProjects.map((proj, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-sky-400">{proj.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{proj.lang}</span>
                </div>
                <p className="text-xs text-slate-300">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* GitHub Activity & Projects */}
      <section className="p-6 rounded-2xl bg-[#0b101c] border border-slate-800 shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Github className="w-5 h-5" />
              <span>Open Source Tooling & Activity</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {authorData.githubActivity.totalContributions} • {authorData.githubActivity.publicRepos}
            </p>
          </div>
          <a
            href="https://github.com/tracehanami"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sky-400 hover:underline flex items-center gap-1"
          >
            <span>github.com/tracehanami</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {authorData.githubActivity.recentProjects.map((proj, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-sky-400">{proj.name}</span>
                <span className="font-mono text-[10px] text-slate-500">{proj.lang}</span>
              </div>
              <p className="text-xs text-slate-300">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PGP Security Block */}
      <section className="p-6 rounded-2xl bg-[#090d16] border border-slate-800">
        <h2 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2">
          PGP Encryption & Authenticity
        </h2>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          For confidential threat vulnerability disclosures or research collaboration, please encrypt using our PGP key:
        </p>
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs text-sky-400 break-all select-all">
          Fingerprint: {authorData.pgpFingerprint}
        </div>
      </section>

    </div>
  );
};
