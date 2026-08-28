import React, { useState } from 'react';
import { generateRssXml } from '../utils/rssGenerator';
import { researchArticles } from '../data/researchData';
import { Rss, Copy, Check, Download, ArrowRight, FileText } from '../components/common/Icons';
import { Link } from 'react-router-dom';

export const RssPage = () => {
  const [copied, setCopied] = useState(false);
  const rssXml = generateRssXml();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rssXml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([rssXml], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="mb-12 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 uppercase tracking-wider mb-2 font-semibold">
          <Rss className="w-4 h-4 text-amber-400" />
          Syndication & RSS 2.0 Feed
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Research RSS Feed
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Subscribe to TraceHanami Research via any standard RSS / Atom reader to receive new threat reports, detection rules, and telemetry breakdowns automatically.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied RSS XML' : 'Copy Feed XML'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download rss.xml</span>
          </button>
        </div>
      </div>

      {/* Feed Items Live Preview */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-white mb-4">
          Feed Contents Preview ({researchArticles.length} publications)
        </h2>
        <div className="space-y-4">
          {researchArticles.map((art) => (
            <div
              key={art.id}
              className="p-5 rounded-2xl bg-[#0e1424] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-amber-400">{art.category} • {art.subCategory}</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  <Link to={`/research/${art.slug}`} className="hover:text-sky-300 transition-colors">
                    {art.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {art.executiveSummary}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-500">Author: TraceHanami</span>
                <Link to={`/research/${art.slug}`} className="text-sky-400 hover:underline">
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw XML Code Preview */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 font-mono">
          Raw XML Markup
        </h2>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-96">
          <code>{rssXml}</code>
        </pre>
      </div>

    </div>
  );
};
