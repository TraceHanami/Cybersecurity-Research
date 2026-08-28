import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  className = '',
  icon: Icon
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-colors border";
  
  const sizeStyles = {
    xs: "text-[11px] px-2 py-0.5 gap-1",
    sm: "text-xs px-2.5 py-1 gap-1.5",
    md: "text-sm px-3 py-1.5 gap-2",
  };

  const variantStyles = {
    default: "bg-slate-800/80 text-slate-300 border-slate-700/60",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/30 hover:border-sky-400/50",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:border-purple-400/50",
    red: "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:border-rose-400/50",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:border-cyan-400/50",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/50",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:border-amber-400/50",
    mitre: "bg-[#141b2d] text-sky-300 border-sky-500/20 font-mono tracking-tight text-[11px] hover:border-sky-400/40",
    tactics: "bg-purple-950/40 text-purple-300 border-purple-500/25 font-mono text-[11px]",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
