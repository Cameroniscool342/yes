import React from 'react';
import { motion } from 'motion/react';

interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}

export const Toggle = ({ enabled, onChange, label }: ToggleProps) => (
  <div className="flex items-center justify-between py-2">
    {label && <span className="text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">{label}</span>}
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 focus:outline-none ${
        enabled ? 'bg-brand-purple shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 border border-white/10'
      }`}
    >
      <motion.span
        animate={{ x: enabled ? 22 : 4 }}
        className={`inline-block h-3 w-3 transform rounded-full transition-colors duration-300 ${
          enabled ? 'bg-white' : 'bg-gray-600'
        }`}
      />
    </button>
  </div>
);

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  suffix?: string;
}

export const Slider = ({ label, value, min, max, step = 1, onChange, suffix = "" }: SliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-2 py-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
        <span>{label}</span>
        <span className="font-mono text-brand-blue drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
          {value}{suffix}
        </span>
      </div>
      <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-visible">
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-300 rounded-full bg-brand-blue shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute -top-2 left-0 w-full h-5 opacity-0 cursor-pointer z-10"
        />
        {/* Custom Thumb */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-sm shadow-[0_0_15px_rgba(59,130,246,0.8)] pointer-events-none transition-all duration-300 z-0"
          style={{ 
            left: `calc(${percentage}% - 7px)`,
          }}
        />
      </div>
    </div>
  );
};

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

export const Select = ({ label, options, value, onChange }: SelectProps) => (
  <div className="space-y-2 py-2">
    <label className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg-dark border border-border-dark rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-brand-purple transition-colors"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export const Keybind = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => {
  const [isBinding, setIsBinding] = React.useState(false);

  React.useEffect(() => {
    if (!isBinding) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      onChange(e.key.toUpperCase());
      setIsBinding(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBinding, onChange]);

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-400 font-medium">{label}</span>
      <button
        onClick={() => setIsBinding(true)}
        className={`min-w-[60px] px-3 py-1.5 rounded bg-bg-dark border border-border-dark text-xs font-mono transition-all ${
          isBinding ? 'border-brand-purple text-brand-purple animate-pulse' : 'text-gray-300 hover:border-gray-500'
        }`}
      >
        {isBinding ? '...' : value}
      </button>
    </div>
  );
};
