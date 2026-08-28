import React from 'react';
import { kanbanData } from '../data/kanbanData';
import { Kanban, CheckCircle, Clock, ArrowRight, Shield } from '../components/common/Icons';
import { Link } from 'react-router-dom';

export const KanbanPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
          <Kanban className="w-4 h-4 text-sky-400" />
          Transparent Research & Development
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Active Research Pipeline
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Real-time roadmap of our ongoing telemetry experiments, threat hunting investigations, and detection engineering rule development.
        </p>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1: Researching */}
        <div className="flex flex-col rounded-2xl bg-[#0b101d] border border-sky-500/20 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
              <h2 className="font-semibold text-sm text-sky-300 uppercase tracking-wider font-mono">
                1. Lab Researching ({kanbanData.researching.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Telemetry Ingestion</span>
          </div>

          <div className="space-y-4 flex-1">
            {kanbanData.researching.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#0f172a]/90 border border-slate-800/80 hover:border-sky-500/40 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded border border-sky-500/30">
                    {item.mitre}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.targetDate}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-sky-400 h-full rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1.5">
                  <span>Lab Progress</span>
                  <span className="text-sky-400 font-semibold">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Writing & Peer Review */}
        <div className="flex flex-col rounded-2xl bg-[#0b101d] border border-purple-500/20 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <h2 className="font-semibold text-sm text-purple-300 uppercase tracking-wider font-mono">
                2. Writing & Rule Testing ({kanbanData.writing.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Drafting</span>
          </div>

          <div className="space-y-4 flex-1">
            {kanbanData.writing.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-[#0f172a]/90 border border-slate-800/80 hover:border-purple-500/40 transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
                    {item.mitre}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.targetDate}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-purple-400 h-full rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-1.5">
                  <span>Peer Review & Testing</span>
                  <span className="text-purple-400 font-semibold">{item.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Published */}
        <div className="flex flex-col rounded-2xl bg-[#0b101d] border border-emerald-500/20 p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h2 className="font-semibold text-sm text-emerald-300 uppercase tracking-wider font-mono">
                3. Published Publications ({kanbanData.published.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">Live Reports</span>
          </div>

          <div className="space-y-4 flex-1">
            {kanbanData.published.map((item) => (
              <Link
                key={item.id}
                to={`/research/${item.slug}`}
                className="block p-5 rounded-xl bg-[#0f172a]/90 border border-slate-800/80 hover:border-emerald-500/50 transition-all hover:-translate-y-0.5 group shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Published
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-xs text-emerald-400 font-medium pt-3 border-t border-slate-800/80">
                  <span>Read Published Threat Report</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
