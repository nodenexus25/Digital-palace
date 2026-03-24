import React from 'react';

interface HeroProps {
 title: string | React.ReactNode;
 subtitle: string;
 description?: string | React.ReactNode;
 backgroundImage?: string;
 children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ 
 title, 
 subtitle, 
 description, 
 backgroundImage,
 children
}) => {
  return (
    <div className="relative bg-[var(--ink-black)] text-[var(--ivory)] py-24 lg:py-40 border-b-4 border-[var(--gold)] overflow-hidden">
 {/* Background Image Placeholder */}
 <div 
 className="absolute inset-0 bg-cover bg-center z-0"
 style={{ 
 backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
 opacity: backgroundImage ? 1 : 0 
 }}
 ></div>
 
 {/* Texture Overlay (keeping consistent with forts if no image, or always?) 
 Forts had texture-mandala. I'll keep it as a base layer.
 */}
 <div className="absolute inset-0 texture-mandala opacity-10 pointer-events-none z-0"></div>

 {/* Dark Brown-Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[var(--ink-black)]/60 to-transparent z-0"></div>

 <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-block mb-4 border-b-2 border-[var(--gold)] pb-2">
 <span 
 className="text-[#D4B483] text-lg lg:text-xl tracking-[0.2em] uppercase"
 style={{ fontFamily: "var(--heading-font)" }}
 >
 {subtitle}
 </span>
 </div>
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[var(--ivory)] drop-shadow-lg"
 style={{ fontFamily: "var(--heading-font)" }}
 >
 {title}
 </h1>
 {description && (
          <p className="text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed text-[color:var(--muted)] italic mb-8" style={{ fontFamily: "var(--font-display)" }}>
 {description}
 </p>
 )}
 {children}
 </div>
 </div>
 );
};

export default Hero;
