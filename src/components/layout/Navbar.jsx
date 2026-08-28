import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Github, Linkedin, Rss, Menu, X, Shield, Terminal, Layers, Crosshair, Kanban } from '../common/Icons';
import { SearchModal } from '../common/SearchModal';

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut for search (⌘K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Research', path: '/research' },
    { name: 'Labs', path: '/labs' },
    { name: 'ATT&CK Matrix', path: '/matrix' },
    { name: 'Pipeline', path: '/pipeline' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled 
            ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40' 
            : 'bg-[#090d16]/60 backdrop-blur-sm border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500/20 to-purple-500/20 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400/60 transition-colors shadow-sm">
                <span className="font-mono text-xs font-bold text-sky-400 group-hover:text-sky-300">TH</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-slate-100 group-hover:text-white transition-colors">
                  TraceHanami <span className="text-sky-400 font-mono text-xs font-normal ml-0.5">/research</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block -mt-1 tracking-wider uppercase">
                  Cybersecurity Journal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'text-sky-300 bg-sky-500/10 border border-sky-500/20 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action controls (Search trigger & Socials) */}
            <div className="flex items-center gap-2.5">
              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 bg-slate-900/90 hover:bg-slate-800 hover:text-slate-200 rounded-lg border border-slate-800 hover:border-slate-700 transition-all font-sans"
                title="Search research and detections (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                  ⌘K
                </kbd>
              </button>

              <div className="h-4 w-px bg-slate-800 hidden sm:block mx-1" />

              {/* GitHub */}
              <a
                href="https://github.com/tracehanami"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-md transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/tracehanami"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-sky-400 hover:bg-slate-800/60 rounded-md transition-colors hidden sm:inline-block"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* RSS Feed */}
              <Link
                to="/rss"
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 rounded-md transition-colors"
                title="RSS Research Feed"
              >
                <Rss className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 rounded-md transition-colors ml-1"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#0e1424] px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-sky-400 bg-sky-950/40 border border-sky-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-xs text-slate-400">
              <a href="https://github.com/tracehanami" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-1.5 hover:text-white">
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a href="https://linkedin.com/in/tracehanami" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-1.5 hover:text-sky-400">
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <Link to="/rss" className="flex items-center gap-1.5 py-1.5 hover:text-amber-400">
                <Rss className="w-3.5 h-3.5" /> RSS Feed
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Instant Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
