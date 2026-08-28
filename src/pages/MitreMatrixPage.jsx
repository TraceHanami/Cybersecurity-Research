import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mitreTactics } from '../data/mitreData';
import { Crosshair, ArrowRight, Shield, Check, Search, FileText } from '../components/common/Icons';

export const MitreMatrixPage = () => {
  const [searchParams] = useSearchParams();
  const initialTacticSlug = searchParams.get('tactic');
  
  const [selectedTactic, setSelectedTactic] = useState(() => {
    if (initialTacticSlug) {
      return mitreTactics.find(t => t.slug === initialTacticSlug) || mitreTactics[0];
    }
    return mitreTactics[0];
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Filter techniques across matrix
  const filteredTactics = mitreTactics.map(tactic => {
    if (!searchQuery.trim()) return tactic;
    const q = searchQuery.toLowerCase();
    const matchesTactic = tactic.name.toLowerCase().includes(q) || tactic.id.toLowerCase().includes(q);
    const matchingTechs = tactic.techniques.filter(t => 
      t.id.toLowerCase().includes(q) || 
      t.name.toLowerCase().includes(q) || 
      t.subtechniques.some(st => st.toLowerCase().includes(q))
    );

    if (matchesTactic || matchingTechs.length > 0) {
      return {
        ...tactic,
        techniques: matchingTechs.length > 0 ? matchingTechs : tactic.techniques
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
          <Crosshair className="w-4 h-4 text-sky-400" />
          Enterprise Matrix Explorer v14
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          MITRE ATT&CK® Coverage Matrix
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Interactive mapping of adversary tactics, techniques, and sub-techniques investigated in TraceHanami laboratory environments, correlated with verified Sigma detection rules.
        </p>

        {/* Search Matrix */}
        <div className="relative max-w-md mt-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ATT&CK technique by ID or name (e.g., T1558, DCSync)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50 font-mono"
          />
        </div>
      </div>

      {/* 11-Tactic Quick Selector */}
      <div className="mb-8">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3 font-semibold">
          Select Tactic Pillar:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {mitreTactics.map((tactic) => {
            const isSelected = selectedTactic?.id === tactic.id;
            return (
              <button
                key={tactic.id}
                onClick={() => setSelectedTactic(tactic)}
                className={`p-3 rounded-xl text-left border transition-all font-mono ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-400/60 text-white shadow-lg'
                    : 'bg-[#0e1424]/80 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>{tactic.id}</span>
                  <span className={isSelected ? 'text-sky-400 font-bold' : 'text-slate-400'}>
                    {tactic.coveragePercent}%
                  </span>
                </div>
                <div className="text-xs font-semibold truncate">
                  {tactic.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tactic Deep-Dive Showcase */}
      {selectedTactic && (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0b101c] border border-sky-500/30 shadow-2xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                  {selectedTactic.id}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {selectedTactic.coveragePercent}% Detection Rate
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedTactic.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                {selectedTactic.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {selectedTactic.techniques.map((tech) => (
              <div
                key={tech.id}
                className="p-4 rounded-xl bg-[#0e1424] border border-slate-800 hover:border-sky-500/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400">
                    {tech.id}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                    {tech.detections} Sigma Detections
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  {tech.name}
                </h3>

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
                    <span>Read Threat Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Rule Active in Detection Range
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Matrix Columns Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">
          Complete Matrix Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTactics.map((tactic) => (
            <div
              key={tactic.id}
              className="p-5 rounded-xl bg-[#0e1424] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono">
                  <span className="text-sky-400 font-semibold">{tactic.id} • {tactic.name}</span>
                  <span className="text-slate-400">{tactic.coveragePercent}%</span>
                </div>
                <div className="space-y-2 mb-4">
                  {tactic.techniques.map((tech) => (
                    <div key={tech.id} className="p-2.5 rounded bg-slate-900/90 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-mono mb-1">
                        <span className="text-sky-400 font-bold">{tech.id}</span>
                        <span className="text-[10px] text-emerald-400">{tech.detections} rules</span>
                      </div>
                      <div className="font-medium text-slate-200">{tech.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedTactic(tactic);
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold text-left pt-2 border-t border-slate-800"
              >
                Inspect {tactic.name} Details →
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
