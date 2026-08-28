import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { researchArticles } from '../data/researchData';
import { Badge } from '../components/common/Badge';
import { CodeBlock } from '../components/common/CodeBlock';
import { ReadingProgressBar } from '../components/layout/ReadingProgressBar';
import { 
  Clock, Calendar, ArrowLeft, Shield, Bug, Download, 
  Printer, Share2, Check, ExternalLink, Server, Crosshair, 
  Terminal, AlertCircle, FileText, CheckCircle 
} from '../components/common/Icons';

export const ResearchArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeSiemTab, setActiveSiemTab] = useState('splunk');

  const article = researchArticles.find(a => a.slug === slug) || researchArticles[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scrollspy for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id], div[id]');
      const scrollPos = window.scrollY + 180;

      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (id && scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
        <Link to="/research" className="text-sky-400 hover:underline text-sm">
          Return to Research Publications
        </Link>
      </div>
    );
  }

  const categoryVariant = 
    article.category === 'Blue Team' ? 'blue' :
    article.category === 'Red Team' ? 'red' :
    article.category === 'Purple Team' ? 'purple' : 'cyan';

  // Table of Contents items
  const tocItems = [
    { id: 'executive-summary', label: '1. Executive Summary' },
    { id: 'attack-overview', label: '2. Attack Overview & Mechanics' },
    { id: 'lab-environment', label: '3. Lab Environment & Telemetry' },
    { id: 'detection-logic', label: '4. Detection Logic & Forensics' },
    { id: 'sigma-rule-section', label: '5. Production Sigma Rule' },
    { id: 'yara-rule-section', label: '6. YARA Detection Signature' },
    { id: 'siem-queries-section', label: '7. SIEM Queries (Splunk & KQL)' },
    { id: 'mitre-mapping-section', label: '8. MITRE ATT&CK® Mapping' },
    { id: 'hardening-recommendations', label: '9. Hardening Playbook' },
    { id: 'references-section', label: '10. References & Artifacts' },
  ];

  return (
    <>
      <ReadingProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back Link & Action Tools */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/80 no-print">
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Catalog</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
              title="Copy shareable link"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied Link' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
              title="Download research PDF or print report"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span>Download PDF / Print</span>
            </button>
          </div>
        </div>

        {/* Article Main Header */}
        <header className="mb-12">
          
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <Badge variant={categoryVariant} size="sm">
              {article.category}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              {article.subCategory}
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Published {article.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 font-display">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-4xl mb-6">
            {article.subtitle}
          </p>

          {/* Author info pill */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0e1424] border border-slate-800/80 max-w-md">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center font-mono font-bold text-xs text-sky-400">
              {article.author.avatar}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">{article.author.name}</div>
              <div className="text-[11px] text-slate-400 font-mono">{article.author.role} • TraceHanami Research Lab</div>
            </div>
          </div>

        </header>

        {/* 2-Column Layout: Left Sticky TOC, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 no-print">
            <div className="sticky top-24 p-5 rounded-xl bg-[#0b101d] border border-slate-800/90 shadow-xl">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                Report Structure
              </div>
              <nav className="space-y-1.5 text-xs">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block py-1.5 px-2.5 rounded transition-all font-medium ${
                        isActive
                          ? 'bg-sky-500/15 text-sky-300 border-l-2 border-sky-400 font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Research Tags */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Topic Tags
                </div>
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/research?tag=${encodeURIComponent(tag)}`}
                      className="text-[10px] font-mono text-slate-400 hover:text-sky-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Threat Report Content Body */}
          <main className="lg:col-span-9 space-y-12 text-slate-200">
            
            {/* Section 1: Executive Summary */}
            <section id="executive-summary" className="p-7 rounded-2xl bg-[#0e1424] border border-sky-500/20 shadow-xl">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold uppercase tracking-wider mb-3">
                <Shield className="w-4 h-4" />
                Executive Summary
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-200">
                {article.executiveSummary}
              </p>
            </section>

            {/* Section 2: Attack Overview & Mechanics */}
            <section id="attack-overview" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-2">
                2. Attack Overview & Protocol Mechanics
              </h2>
              <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300 space-y-4">
                {article.sections.find(s => s.id === 'attack-overview')?.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 3: Lab Environment & Telemetry */}
            <section id="lab-environment" className="space-y-4 p-6 rounded-2xl bg-[#0a0f1d] border border-slate-800/90">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-xl font-bold text-white">
                    3. Lab Environment & Instrumentation
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified In Range
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                  <span className="font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                    Infrastructure Range
                  </span>
                  <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                    {article.labEnvironment.architecture}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#0e1424] border border-slate-800">
                  <span className="font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
                    Telemetry Ingestion Providers
                  </span>
                  <ul className="space-y-1 text-slate-300 font-mono text-[11px]">
                    {article.labEnvironment.telemetrySources.map((src, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-sky-400">✓</span> {src}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4: Detection Logic & Forensics */}
            <section id="detection-logic" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-2">
                4. Detection Logic & Forensic Telemetry
              </h2>
              <div className="text-sm leading-relaxed text-slate-300 space-y-4">
                {article.sections.find(s => s.id === 'detection-logic')?.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 5: Production Sigma Rule */}
            <section id="sigma-rule-section" className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky-400" />
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    5. Production Sigma Rule
                  </h2>
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-950/40 px-2.5 py-1 rounded border border-sky-500/30">
                  Sigma v2.0 Standard
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Production-validated rule targeting immutable protocol behavior. Ready for conversion via PySigma into SPL, KQL, Elastic, or Chronicle.
              </p>
              <CodeBlock 
                code={article.sigmaRule} 
                language="yaml" 
                title={`${article.slug}.yml`} 
              />
            </section>

            {/* Section 6: YARA Detection Signature */}
            {article.yaraRule && (
              <section id="yara-rule-section" className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-rose-400" />
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      6. YARA Detection Signature
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/30">
                    Memory & Disk Signature
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Author-crafted YARA signature for endpoint memory scanning, memory dump triage, or disk scanning.
                </p>
                <CodeBlock 
                  code={article.yaraRule} 
                  language="c" 
                  title={`${article.slug}.yar`} 
                />
              </section>
            )}

            {/* Section 7: SIEM Queries (Splunk & KQL) */}
            {article.siemQueries && (
              <section id="siem-queries-section" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    7. Translated SIEM Queries
                  </h2>
                  
                  {/* SIEM Toggle Tabs */}
                  <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveSiemTab('splunk')}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors ${
                        activeSiemTab === 'splunk'
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Splunk SPL
                    </button>
                    <button
                      onClick={() => setActiveSiemTab('kql')}
                      className={`px-3 py-1 text-xs font-mono font-medium rounded transition-colors ${
                        activeSiemTab === 'kql'
                          ? 'bg-sky-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Microsoft Sentinel KQL
                    </button>
                  </div>
                </div>

                {activeSiemTab === 'splunk' && (
                  <CodeBlock
                    code={article.siemQueries.splunk}
                    language="spl"
                    title="Splunk Search Processing Language (SPL)"
                  />
                )}

                {activeSiemTab === 'kql' && (
                  <CodeBlock
                    code={article.siemQueries.kql}
                    language="kql"
                    title="Kusto Query Language (KQL)"
                  />
                )}
              </section>
            )}

            {/* Section 8: MITRE ATT&CK Mapping */}
            <section id="mitre-mapping-section" className="space-y-4 p-6 rounded-2xl bg-[#0e1424] border border-slate-800">
              <div className="flex items-center gap-2">
                <Crosshair className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold text-white">
                  8. MITRE ATT&CK® Enterprise Matrix Mapping
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {article.mitreTags.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                        {m.id}
                      </span>
                      <span className="text-xs font-medium text-slate-200">
                        {m.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-purple-400">
                      {m.tactic}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Hardening & Mitigations */}
            <section id="hardening-recommendations" className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight border-b border-slate-800 pb-2">
                9. Mitigation & Hardening Playbook
              </h2>
              <div className="text-sm leading-relaxed text-slate-300 space-y-4">
                {article.sections.find(s => s.id === 'hardening-recommendations')?.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 10: References & Indicators */}
            <section id="references-section" className="space-y-4 p-6 rounded-2xl bg-[#090d16] border border-slate-800/80">
              <h2 className="text-lg font-bold text-white tracking-tight">
                10. References & Hash Indicators
              </h2>
              <div className="text-xs font-mono text-slate-400 leading-relaxed space-y-2">
                {article.sections.find(s => s.id === 'references')?.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </section>

          </main>

        </div>

      </div>
    </>
  );
};
