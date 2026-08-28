import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mitreTactics } from '../../data/mitreData';
import { Crosshair, ArrowRight, Shield, Check, Layers } from '../common/Icons';

export const MitreCoveragePreview = () => {
  const [activeTactic, setActiveTactic] = useState(mitreTactics[5]); // Default Credential Access

  return (
    <section className="py-20 bg-[#090d16] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
              <Crosshair className="w-4 h-4 text-sky-400" />
              Adversary Tactics & Techniques
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              MITRE ATT&CK® Enterprise Coverage
            </h2>
          </div>
          <Link
            to="/matrix"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors mt-3 md:mt-0 group"
          >
            <span>Open Full Interactive Matrix Explorer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tactical Matrix Horizontal Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-8">
          {mitreTactics.map((tactic) => {
            const isSelected = activeTactic.id === tactic.id;
            return (
              <button
                key={tactic.id}
                onClick={() => setActiveTactic(tactic)}
                className={`p-3.5 rounded-xl text-left transition-all border font-mono ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-400/60 shadow-lg shadow-sky-500/10'
                    : 'bg-[#0e1424]/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>{tactic.id}</span>
                  <span className={`font-semibold ${isSelected ? 'text-sky-400' : 'text-slate-400'}`}>
                    {tactic.coveragePercent}%
                  </span>
                </div>
                <div className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {tactic.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {tactic.techniquesCount} techniques
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tactic Breakdown Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b101c] border border-sky-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-500/30">
                  {activeTactic.id}
                </span>
                <span className="font-mono text-xs text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
                  {activeTactic.coveragePercent}% Defensive Coverage
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {activeTactic.name} Tactic Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                {activeTactic.description}
              </p>
            </div>

            <Link
              to={`/matrix?tactic=${activeTactic.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              <span>Explore All {activeTactic.name} Detections</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Active Tactic Techniques Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {activeTactic.techniques.map((tech) => (
              <div
                key={tech.id}
                className="p-4 rounded-xl bg-[#0f172a]/90 border border-slate-800/90 hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400">
                    {tech.id}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {tech.detections} Active Rules
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 mb-2">
                  {tech.name}
                </h4>

                <div className="space-y-1 mb-4">
                  {tech.subtechniques.map((sub, i) => (
                    <div key={i} className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="text-slate-600">↳</span>
                      <span className="truncate">{sub}</span>
                    </div>
                  ))}
                </div>

                {tech.researchSlug ? (
                  <Link
                    to={`/research/${tech.researchSlug}`}
                    className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors"
                  >
                    <span>Read Threat Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    to={`/matrix?tactic=${activeTactic.slug}`}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    View Detection Rules →
                  </Link>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
