import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { researchArticles } from '../data/researchData';
import { Badge } from '../components/common/Badge';
import { Search, Filter, Clock, Calendar, ArrowRight, Shield, FileText, X, Crosshair } from '../components/common/Icons';

export const ResearchCatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const activeTag = searchParams.get('tag') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Blue Team', 'Red Team', 'Purple Team', 'Threat Intelligence'];

  // All unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    researchArticles.forEach(a => a.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return researchArticles.filter(art => {
      // Category filter
      if (activeCategory !== 'All' && art.category !== activeCategory) {
        return false;
      }

      // SubCategory filter
      if (selectedSubCategory !== 'All' && art.subCategory !== selectedSubCategory) {
        return false;
      }

      // Tag filter
      if (activeTag && !art.tags.includes(activeTag)) {
        return false;
      }

      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = art.title.toLowerCase().includes(q);
        const matchSub = art.subtitle.toLowerCase().includes(q);
        const matchSummary = art.executiveSummary.toLowerCase().includes(q);
        const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
        const matchMitre = art.mitreTags.some(m => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q));

        if (!matchTitle && !matchSub && !matchSummary && !matchTags && !matchMitre) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, selectedSubCategory, activeTag, searchQuery]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
    setSelectedSubCategory('All');
  };

  const handleTagClick = (tag) => {
    const params = new URLSearchParams(searchParams);
    if (activeTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setSelectedSubCategory('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-800/80 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-sky-400 uppercase tracking-wider mb-2 font-semibold">
          <FileText className="w-4 h-4 text-sky-400" />
          Threat Reports, Detection Engineering & DFIR
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Research Journal & Publications
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          In-depth technical investigations, attack mechanics breakdowns, forensic telemetry baselines, and production-ready Sigma and YARA rules.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="mb-8 space-y-4">
        
        {/* Top search & category bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, MITRE code, rule..."
              className="w-full pl-9 pr-8 py-2 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Popular Tags row */}
        <div className="flex items-center gap-2 flex-wrap pt-2">
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Tags:
          </span>
          {allTags.slice(0, 10).map((tag) => {
            const isSelected = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded transition-colors ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 font-semibold'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {(activeCategory !== 'All' || activeTag || searchQuery || selectedSubCategory !== 'All') && (
            <button
              onClick={clearAllFilters}
              className="text-[11px] font-mono text-rose-400 hover:text-rose-300 ml-auto underline"
            >
              Clear filters
            </button>
          )}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 pb-2 border-b border-slate-800/50">
        <span>Showing {filteredArticles.length} of {researchArticles.length} research publications</span>
        <span>Sorted by: Most Recent</span>
      </div>

      {/* Articles List Grid */}
      {filteredArticles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-300 font-medium mb-2">No research publications found matching your filter criteria.</p>
          <button
            onClick={clearAllFilters}
            className="text-xs font-mono text-sky-400 hover:underline"
          >
            Reset all search and category filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => {
            const categoryVariant = 
              art.category === 'Blue Team' ? 'blue' :
              art.category === 'Red Team' ? 'red' :
              art.category === 'Purple Team' ? 'purple' : 'cyan';

            return (
              <article
                key={art.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-[#0e1424]/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3">
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
                  <h2 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors mb-2 leading-snug">
                    <Link to={`/research/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h2>

                  {/* Subtitle / summary */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {art.subtitle || art.executiveSummary}
                  </p>
                </div>

                <div>
                  {/* MITRE Badges */}
                  <div className="pt-3 border-t border-slate-800/80 mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {art.mitreTags.map((m) => (
                        <span
                          key={m.id}
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/40 text-sky-300 border border-sky-500/20"
                        >
                          <span className="font-semibold">{m.id}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Link CTA */}
                  <Link
                    to={`/research/${art.slug}`}
                    className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-slate-900/90 hover:bg-sky-500/10 text-xs font-semibold text-sky-400 border border-slate-800 hover:border-sky-500/30 transition-colors group/btn"
                  >
                    <span>Read Threat Report & Detection Rules</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
};
