import React from 'react';
import { Link } from 'react-router-dom';
import { labsData } from '../../data/labsData';
import { Server, ArrowRight, Shield, Cpu, Activity, Check } from '../common/Icons';

export const LabsShowcase = () => {
  return (
    <section className="py-20 bg-[#070a12] border-b border-slate-800/60">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labsData.map((lab) => (
            <div
              key={lab.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
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
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {lab.summary}
                </p>

                {/* Tech Stack Pills */}
                <div className="mb-5">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Core Technologies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                    {lab.technologies.length > 4 && (
                      <span className="text-[10px] font-mono text-slate-500 px-1 py-0.5">
                        +{lab.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Research Finding */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 mb-5">
                  <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider mb-1 font-semibold">
                    Key Lab Finding:
                  </div>
                  <p className="text-[11px] text-slate-300 leading-normal line-clamp-2">
                    {lab.researchFindings[0]}
                  </p>
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
