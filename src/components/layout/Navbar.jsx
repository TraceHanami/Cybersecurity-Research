import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Github, Linkedin, Rss, Menu, X, Shield, Terminal, Layers, Crosshair, Kanban } from '../common/Icons';
import { SearchModal } from '../common/SearchModal';

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      <header className="sticky top-0 z-40 w-full bg-background border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <span className="w-8 h-8 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-sky-400">TH</span>
              <div className="flex flex-col">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
                  TraceHanami <span className="text-sky-400 font-mono text-xs font-normal ml-0.5">/research</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline-block -mt-1 tracking-wider uppercase">
                  Cybersecurity Journal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`py-1.5 text-xs font-medium border-b ${
                      isActive
                        ? 'text-sky-400 border-sky-400'
                        : 'text-slate-400 hover:text-sky-400 border-transparent'
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
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-sky-400 rounded border border-transparent font-sans"
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
          <div className="md:hidden border-b border-slate-800 bg-background-secondary px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
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
