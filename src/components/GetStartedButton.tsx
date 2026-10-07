import React, { useRef, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface GetStartedButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const GetStartedButton: React.FC<GetStartedButtonProps> = ({
  onClick,
  label = "Get Started Free",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 220);
    let height = (canvas.height = canvas.offsetHeight || 52);

    // Floating particles state
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string }> = [];
    const colors = ['#6D4AFF', '#9D85FF', '#38BDF8', '#F43F5E', '#FFFFFF'];

    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.02;

      // Draw refractive spectral ring shimmer
      const gradient = ctx.createLinearGradient(
        width / 2 + Math.cos(angle) * (width / 2),
        height / 2 + Math.sin(angle) * (height / 2),
        width / 2 - Math.cos(angle) * (width / 2),
        height / 2 - Math.sin(angle) * (height / 2)
      );
      gradient.addColorStop(0, 'rgba(109, 74, 255, 0.25)');
      gradient.addColorStop(0.3, 'rgba(56, 189, 248, 0.3)');
      gradient.addColorStop(0.7, 'rgba(244, 63, 94, 0.25)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative inline-block group ${className}`}>
      {/* Outer Refractive Spectral Ring Glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#6D4AFF] via-[#38BDF8] to-[#F43F5E] opacity-70 blur-md group-hover:opacity-100 transition duration-300 animate-pulse" />
      
      {/* Liquid Chrome Button Container */}
      <button
        onClick={onClick}
        className="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-gradient-to-br from-white via-[#F7F5F2] to-[#E9E4FF] border border-white/80 shadow-2xl text-[#1F2937] font-extrabold text-sm flex items-center space-x-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer backdrop-blur-md"
        style={{
          boxShadow: '0 10px 30px -10px rgba(109, 74, 255, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Canvas Particle Overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-65 mix-blend-overlay"
        />

        {/* Crystal Center Core Symbol */}
        <div className="w-6 h-6 rounded-lg bg-[#6D4AFF] text-white flex items-center justify-center font-bold text-xs shadow-md shadow-[#6D4AFF]/40 shrink-0 group-hover:rotate-12 transition-transform duration-300">
          <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
        </div>

        {/* Label Text */}
        <span className="relative z-10 tracking-tight font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] transition-colors">
          {label}
        </span>

        {/* Arrow Pointer */}
        <ArrowRight className="w-4 h-4 text-[#6D4AFF] relative z-10 group-hover:translate-x-1 transition-transform" />

        {/* Pointer Light Scratch Highlight */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
      </button>
    </div>
  );
};
