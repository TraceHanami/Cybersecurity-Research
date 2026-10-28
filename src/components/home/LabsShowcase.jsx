import React from 'react';
import { Link } from 'react-router-dom';
import { getCuratedLabs } from '../../data/curation';
import { Server, ArrowRight, Shield, Cpu, Activity, Check } from '../common/Icons';

export const LabsShowcase = () => {
  const labsData = getCuratedLabs();
  if (labsData.length === 0) return null;
  return (
    <section className="py-20 bg-background border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2 font-semibold">
              <Server className="w-4 h-4 text-emerald-400" />
              Instrumentation & Research Environments
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Laboratory Ranges
            </h2>
          </div>
          <Link
            to="/labs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors mt-3 md:mt-0 group"
          >
            <span>Explore all lab architectures & playbooks</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Labs Grid */}
        <div className="max-w-4xl divide-y divide-slate-800 border-y border-slate-800">
          {labsData.map((lab) => (
            <div
              key={lab.id}
              className="flex flex-col justify-between py-7 group"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {lab.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {lab.telemetryRate}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                  <Link to={`/labs/${lab.slug}`}>
                    {lab.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {lab.summary}
                </p>

                {/* Tech Stack Pills */}
                <div className="mb-5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Core Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Research Finding */}
                <div className="py-3 border-y border-slate-800 mb-5">
                  <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider mb-1 font-semibold">
                    Key Lab Finding:
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-300 leading-normal">
                    {lab.researchFindings.map((finding, index) => (
                      <p key={index}>{finding}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-slate-800/80">
                <Link
                  to={`/labs/${lab.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>View Lab Architecture & Detections</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
