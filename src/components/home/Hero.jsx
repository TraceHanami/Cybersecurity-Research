import React from 'react';
import { Link } from 'react-router-dom';
import { NetworkCanvas } from './NetworkCanvas';
import { ArrowRight, Server, Github, Linkedin, Shield, Terminal, BookOpen, Activity } from '../common/Icons';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 overflow-hidden border-b border-slate-800/60">
      {/* Dynamic Network Canvas Background */}
      <NetworkCanvas />

      {/* Radial Gradient Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[280px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>RESEARCH LABS OPERATIONAL</span>
          <span className="text-slate-600">|</span>
          <span className="text-sky-400 font-semibold">SIGMA & YARA REPOSITORY ACTIVE</span>
        </div>

        {/* Primary Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 font-display leading-[1.1]">
          TraceHanami
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-sky-300 mt-2 text-3xl sm:text-5xl lg:text-6xl">
            Cybersecurity Research
          </span>
        </h1>

        {/* Roles Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 font-mono text-xs sm:text-sm">
          <span className="px-3 py-1 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/30">
            🔵 Blue Team
          </span>
          <span className="px-3 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/30">
            🔴 Red Team
          </span>
          <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/30">
            🟣 Purple Team
          </span>
          <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            🌐 Threat Intelligence
          </span>
          <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            ⚡ Detection Engineering
          </span>
        </div>

        {/* Short Mission Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          Documenting cybersecurity research, threat hunting methodologies, adversary emulation, DFIR investigations, detection engineering, and laboratory experimentation.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Research</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/labs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5"
          >
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Explore Labs</span>
          </Link>

          <a
            href="https://github.com/tracehanami"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/tracehanami"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-sky-400 text-sm border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left max-w-4xl mx-auto">
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-100">28+</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Research Articles</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400">64</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Sigma Rules</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">37</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">YARA Rules</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">5</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium">Enterprise Labs</div>
          </div>
        </div>

      </div>
    </section>
  );
};
