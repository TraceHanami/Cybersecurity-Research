import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from './Icons';

export const CodeBlock = ({ 
  code, 
  language = 'yaml', 
  title = '', 
  showLineNumbers = true,
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className={`rounded-lg overflow-hidden border border-slate-800 bg-[#0b101b] my-4 shadow-xl ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1524] border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
          <span className="text-sky-400 font-semibold uppercase tracking-wider">{language}</span>
          {title && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 font-medium truncate max-w-xs">{title}</span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-sans font-medium focus:outline-none focus:ring-1 focus:ring-sky-500/50"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <pre className="flex">
          {showLineNumbers && (
            <div className="select-none pr-4 mr-4 text-right text-slate-600 border-r border-slate-800/80 min-w-[2.5rem]">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="flex-1 font-mono">{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};
