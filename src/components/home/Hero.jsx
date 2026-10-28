import React from 'react';
import { Link } from 'react-router-dom';

export const Hero = () => (
  <section className="border-b border-slate-800/60">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="max-w-[68ch]">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight mb-6">
          TraceHanami
          <span className="block text-2xl sm:text-4xl mt-3">Cybersecurity &amp; VAPT Research</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
          Independent cybersecurity research and penetration testing: documenting hands-on Vulnerability Assessment and Penetration Testing (VAPT), live threat intelligence investigations, digital forensics, and protocol reverse engineering with reproducible proof-of-concepts and remediation playbooks.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/research" className="text-sky-400 hover:underline">Read Research &amp; VAPT</Link>
          <Link to="/labs" className="text-sky-400 hover:underline">Explore Testbeds</Link>
          <a href="https://github.com/tracehanami" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">GitHub</a>
          <a href="https://linkedin.com/in/tracehanami" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">LinkedIn</a>
        </nav>
      </div>
    </div>
  </section>
);
