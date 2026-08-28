import React from 'react';
import { statsData } from '../../data/statsData';
import { FileText, Shield, Bug, Crosshair, Server, Award, ArrowRight } from '../common/Icons';
import { Link } from 'react-router-dom';

const iconMap = {
  FileText,
  Shield,
  Bug,
  Crosshair,
  Server,
  Award
};

export const StatsDashboard = () => {
  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800/60">
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {statsData.map((stat) => {
            const Icon = iconMap[stat.icon] || Shield;
            
            const colorClasses = {
              blue: {
                bg: 'bg-sky-500/10',
                border: 'border-sky-500/25',
                text: 'text-sky-400',
                glow: 'group-hover:border-sky-500/50',
              },
              purple: {
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/25',
                text: 'text-purple-400',
                glow: 'group-hover:border-purple-500/50',
              },
              red: {
                bg: 'bg-rose-500/10',
                border: 'border-rose-500/25',
                text: 'text-rose-400',
                glow: 'group-hover:border-rose-500/50',
              },
              cyan: {
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/25',
                text: 'text-cyan-400',
                glow: 'group-hover:border-cyan-500/50',
              },
              emerald: {
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/25',
                text: 'text-emerald-400',
                glow: 'group-hover:border-emerald-500/50',
              },
              amber: {
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/25',
                text: 'text-amber-400',
                glow: 'group-hover:border-amber-500/50',
              },
            }[stat.color] || { bg: 'bg-slate-800', border: 'border-slate-700', text: 'text-slate-200', glow: '' };

            return (
              <div
                key={stat.id}
                className={`group relative p-6 rounded-xl bg-[#0e1424]/80 backdrop-blur-sm border border-slate-800/90 transition-all duration-300 hover:-translate-y-1 hover:bg-[#12192e] shadow-lg ${colorClasses.glow}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    {stat.domain}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-mono font-medium ${colorClasses.text}`}>
                    Active
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-200 mb-2">
                  {stat.label}
                </h3>

                <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 pt-2 border-t border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
