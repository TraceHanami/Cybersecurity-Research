import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from '../components/common/Icons';

export const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-6 text-rose-400">
        <Shield className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/30 font-semibold">
        404 / TELEMETRY DROP
      </span>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4 mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
        The requested research report, detection rule, or lab endpoint could not be found or has been archived.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
