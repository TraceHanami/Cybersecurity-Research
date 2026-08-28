import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { labsData } from '../data/labsData';
import { Server, ArrowRight, Shield, Cpu, Activity, Check, Filter } from '../components/common/Icons';

export const LabsCatalogPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredLabs = labsData.filter(lab => {
    if (selectedFilter === 'All') return true;
    return lab.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
          <Server className="w-4 h-4 text-emerald-400" />
          Enterprise Telemetry & Emulation Ranges
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Research Labs & Instrumentation
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Dedicated, isolated laboratory networks purpose-built to simulate modern enterprise attacks, collect raw kernel & network telemetry, benchmark SIEM detections, and validate threat hunting hypotheses.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {['All', 'Active Directory', 'SOC Lab', 'Malware Analysis', 'Cloud Security', 'Purple Team'].map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedFilter === filter
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="flex flex-col justify-between p-7 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {lab.status}
                </span>
                <div className="text-xs font-mono text-slate-400">
                  <span>{lab.nodesCount} Nodes</span>
                  <span className="mx-1.5">•</span>
                  <span>{lab.telemetryRate}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-3">
                <Link to={`/labs/${lab.slug}`}>
                  {lab.title}
                </Link>
              </h2>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {lab.summary}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Technologies & Instrumentation:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {lab.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono text-slate-300 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Findings Bullet List */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6">
                <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-2 font-semibold">
                  Key Research Discoveries:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {lab.researchFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span className="leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="pt-4 border-t border-slate-800">
              <Link
                to={`/labs/${lab.slug}`}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-emerald-500/10 text-xs font-semibold text-emerald-400 border border-slate-800 hover:border-emerald-500/30 transition-colors group/btn"
              >
                <span>Explore Full Architecture & Detection Playbooks</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
