import React from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  onClick?: () => void;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className = '',
  innerClassName = '',
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer active:scale-[0.98] transition-transform duration-200 ${className}`}
      {...props}
    >
      {/* Spinning Conic Gradient Border */}
      <span
        aria-hidden="true"
        className="absolute inset-[-100%] w-[300%] h-[300%] top-[-100%] left-[-100%] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, #8B5CF6 38%, #06B6D4 52%, transparent 65%)',
          animation: 'spinConic 4s linear infinite',
        }}
      />

      {/* Inner Content Container */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#0A0A0A] text-white text-sm sm:text-base font-medium tracking-wide transition-colors group-hover:bg-[#111115] ${innerClassName}`}
      >
        {children}
      </span>
    </button>
  );
};
