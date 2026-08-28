import React from 'react';
import { Link } from 'react-router-dom';
import { researchArticles } from '../../data/researchData';
import { Badge } from '../common/Badge';
import { Clock, Calendar, ArrowRight, Shield, Crosshair, Terminal, FileText } from '../common/Icons';

export const FeaturedResearch = () => {
  const featured = researchArticles.filter(art => art.featured).slice(0, 4);

  return (
    <section className="py-20 bg-[#070a12] border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Selected Publications & Threat Reports
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Research
            </h2>
          </div>
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors mt-3 md:mt-0 group"
          >
            <span>View all 28+ publications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featured.map((art) => {
            const categoryVariant = 
              art.category === 'Blue Team' ? 'blue' :
              art.category === 'Red Team' ? 'red' :
              art.category === 'Purple Team' ? 'purple' : 'cyan';

            return (
              <article
                key={art.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1"
              >
                <div>
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Badge variant={categoryVariant} size="sm">
                        {art.category}
                      </Badge>
                      <span className="text-xs font-mono text-slate-400">
                        {art.subCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {art.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {art.date}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors mb-3 leading-snug">
                    <Link to={`/research/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  {/* Executive Summary Snippet */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 mb-6">
                    {art.executiveSummary}
                  </p>
                </div>

                <div>
                  {/* MITRE ATT&CK Tags */}
                  <div className="pt-4 border-t border-slate-800/80 mb-5">
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      MITRE ATT&CK® Mapping
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {art.mitreTags.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950/40 text-sky-300 border border-sky-500/20"
                          title={m.name}
                        >
                          <span className="font-semibold mr-1">{m.id}</span>
                          <span className="text-slate-400 hidden sm:inline truncate max-w-[120px]">{m.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read Threat Report Button */}
                  <Link
                    to={`/research/${art.slug}`}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-slate-900/90 hover:bg-sky-500/10 text-xs font-semibold text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-colors group/btn"
                  >
                    <span>Read Full Investigation & Rules</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
