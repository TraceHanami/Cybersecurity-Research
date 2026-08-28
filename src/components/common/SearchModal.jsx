import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Server, Crosshair, ArrowRight, Hash, Shield } from './Icons';
import { searchAll } from '../../utils/search';
import { Badge } from './Badge';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ articles: [], labs: [], mitre: [] });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults({ articles: [], labs: [], mitre: [] });
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const res = searchAll(query);
      setResults(res);
      setSelectedIndex(0);
    } else {
      setResults({ articles: [], labs: [], mitre: [] });
    }
  }, [query]);

  // Combine items for keyboard navigation
  const allItems = [
    ...results.articles.map(a => ({ type: 'article', item: a, url: `/research/${a.slug}` })),
    ...results.labs.map(l => ({ type: 'lab', item: l, url: `/labs/${l.slug}` })),
    ...results.mitre.map(m => ({ 
      type: 'mitre', 
      item: m, 
      url: m.researchSlug ? `/research/${m.researchSlug}` : `/matrix?tactic=${m.tacticSlug}` 
    }))
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (allItems.length || 1)) % (allItems.length || 1));
    } else if (e.key === 'Enter' && allItems[selectedIndex]) {
      e.preventDefault();
      navigate(allItems[selectedIndex].url);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#0e1424] border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#121a2f]">
          <Search className="w-5 h-5 text-sky-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research reports, Sigma rules, MITRE ATT&CK techniques, labs..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-2 py-0.5 text-xs text-slate-400 bg-slate-800 rounded border border-slate-700 hover:bg-slate-700 select-none"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-800/40">
          {query.trim().length === 0 ? (
            <div className="py-8 px-4 text-center">
              <p className="text-sm text-slate-400 mb-3 font-medium">Quick Discovery by Topic</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Kerberoasting', 'Sigma Rules', 'Active Directory', 'BPFdoor', 'eBPF', 'AWS CloudTrail', 'DCSync', 'LLM Security'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 hover:border-sky-500/40 hover:text-sky-300 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : allItems.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm">
              No research artifacts or detection rules matching "<span className="text-slate-200">{query}</span>"
            </div>
          ) : (
            <>
              {/* Research Articles */}
              {results.articles.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 py-1">
                    Research Publications ({results.articles.length})
                  </div>
                  {results.articles.map((art, i) => {
                    const isSelected = allItems[selectedIndex]?.item?.id === art.id;
                    return (
                      <div
                        key={art.id}
                        onClick={() => {
                          navigate(`/research/${art.slug}`);
                          onClose();
                        }}
                        className={`flex items-start justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected ? 'bg-sky-500/15 border border-sky-500/30 text-white' : 'hover:bg-slate-800/50 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-slate-100 truncate">{art.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{art.subtitle}</p>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <Badge size="xs" variant={art.category === 'Blue Team' ? 'blue' : art.category === 'Red Team' ? 'red' : 'purple'}>
                                {art.category}
                              </Badge>
                              {art.mitreTags.slice(0, 2).map(m => (
                                <span key={m.id} className="text-[10px] font-mono text-sky-400 bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-500/20">
                                  {m.id}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 ml-2 mt-1 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Research Labs */}
              {results.labs.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 py-1">
                    Telemetry & Research Labs ({results.labs.length})
                  </div>
                  {results.labs.map(lab => (
                    <div
                      key={lab.id}
                      onClick={() => {
                        navigate(`/labs/${lab.slug}`);
                        onClose();
                      }}
                      className="flex items-start justify-between p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer text-slate-300 transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <Server className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-100">{lab.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{lab.summary}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 ml-2 mt-1 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* MITRE ATT&CK Techniques */}
              {results.mitre.length > 0 && (
                <div className="py-2">
                  <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 px-3 py-1">
                    MITRE ATT&CK Matrix ({results.mitre.length})
                  </div>
                  {results.mitre.map(m => (
                    <div
                      key={m.techniqueId + m.tacticId}
                      onClick={() => {
                        if (m.researchSlug) {
                          navigate(`/research/${m.researchSlug}`);
                        } else {
                          navigate(`/matrix?tactic=${m.tacticSlug}`);
                        }
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/50 cursor-pointer text-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Crosshair className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="font-mono text-xs text-sky-400 bg-sky-950/40 px-1.5 py-0.5 rounded border border-sky-500/20">
                          {m.techniqueId}
                        </span>
                        <span className="text-xs text-slate-200 font-medium truncate">{m.techniqueName}</span>
                        <span className="text-[11px] text-slate-500">in {m.tacticName}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#090d16] border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center font-mono">
          <span>Navigate with <kbd className="text-slate-400 bg-slate-800 px-1 rounded">↑</kbd> <kbd className="text-slate-400 bg-slate-800 px-1 rounded">↓</kbd></span>
          <span>Select with <kbd className="text-slate-400 bg-slate-800 px-1 rounded">Enter</kbd></span>
        </div>
      </div>
    </div>
  );
};
