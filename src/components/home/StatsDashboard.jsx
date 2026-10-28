import React from 'react';
import { getCuratedStats } from '../../data/curation';

export const StatsDashboard = () => {
  const statsData = getCuratedStats();
  if (statsData.length === 0) return null;

  return (
    <section className="py-16 bg-background border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Research & Engineering Telemetry
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Operational Statistics
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-2 md:mt-0">
            Real-time tally of published threat analyses, detection rules, laboratory ranges, and verified offensive security benchmarks.
          </p>
        </div>

        <div className="max-w-4xl border-y border-slate-800 divide-y divide-slate-800">
          {statsData.map((stat) => (
            <div key={stat.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5">
              <div>
                <div className="text-xs text-slate-500 mb-1">{stat.domain}</div>
                <h3 className="text-base font-semibold text-slate-200">{stat.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
              </div>
              <div className="flex items-baseline gap-3 sm:text-right">
                <span className="text-2xl font-semibold font-mono text-white">{stat.value}</span>
                <span className="text-xs text-slate-400">Active</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
