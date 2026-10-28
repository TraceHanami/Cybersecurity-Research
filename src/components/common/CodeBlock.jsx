import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from './Icons';

export const CodeBlock = ({ 
  code, 
  language = 'yaml', 
  title = '', 
  showLineNumbers = false,
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

  const lines = code.split('\n');

  return (
    <div className={`rounded-md overflow-hidden border border-white/10 bg-background-code my-4 ${className}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-background-secondary border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-sky-400 font-semibold uppercase tracking-wider">{language}</span>
          {title && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 font-medium">{title}</span>
            </>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/10 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-sans font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
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
          <code className="flex-1 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
};
