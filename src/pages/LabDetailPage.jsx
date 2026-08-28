import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { labsData } from '../data/labsData';
import { Server, ArrowLeft, Shield, Cpu, Activity, CheckCircle, Crosshair, ArrowRight } from '../components/common/Icons';

export const LabDetailPage = () => {
  const { slug } = useParams();
  const lab = labsData.find(l => l.slug === slug) || labsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!lab) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Lab Not Found</h1>
        <Link to="/labs" className="text-sky-400 hover:underline text-sm">
          Return to Labs Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back Button */}
      <div className="mb-8">
        <Link
          to="/labs"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Labs Catalog</span>
        </Link>
      </div>

      {/* Lab Header */}
      <div className="mb-12 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {lab.status}
          </span>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            {lab.category}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Ingestion: {lab.telemetryRate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          {lab.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
          {lab.purpose}
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Architecture & Nodes */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Architecture Topology Panel */}
          <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">
                Network & Node Topology
              </h2>
            </div>
            
            <div className="space-y-4 text-xs font-mono">
              {Object.entries(lab.architecture).map(([key, val]) => (
                <div key={key} className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800">
                  <div className="text-sky-400 uppercase tracking-wider text-[11px] mb-1.5 font-semibold">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  {Array.isArray(val) ? (
                    <ul className="space-y-1 text-slate-300">
                      {val.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400">▪</span> {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-300">{val}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings */}
          <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl font-bold text-white">
                Empirical Research Discoveries
              </h2>
            </div>
            <div className="space-y-3">
              {lab.researchFindings.map((finding, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed flex items-start gap-3">
                  <span className="font-mono text-sky-400 font-bold mt-0.5">0{idx + 1}.</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Technologies & Detection Opportunities */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">
              Technologies & Tooling
            </h2>
            <div className="flex flex-wrap gap-2">
              {lab.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Detection Opportunities */}
          <div className="p-6 rounded-2xl bg-[#0e1424] border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">
                Detection Opportunities
              </h2>
            </div>
            <div className="space-y-3">
              {lab.detectionOpportunities.map((opp, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-purple-400">{opp.tactic}</span>
                    <span className="text-sky-400 font-semibold">{opp.technique}</span>
                  </div>
                  <div className="text-slate-300 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-900">
                    {opp.rule}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link to Research CTA */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-950/40 to-purple-950/40 border border-sky-500/30">
            <h3 className="text-base font-bold text-white mb-2">
              Related Research Publications
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Telemetry generated in this range directly powers our published detection engineering papers and Sigma rules.
            </p>
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
            >
              <span>Explore Research Papers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
