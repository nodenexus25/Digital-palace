import React from 'react';

interface DynastySealProps {
 dynasty: string;
 className?: string;
 color?: string;
}

export const DynastySeal: React.FC<DynastySealProps> = ({ dynasty, className = "w-full h-full", color = "currentColor" }) => {
 const getSealContent = () => {
 switch (dynasty) {
 case 'Sisodia': // Mewar - The Sun (Surya)
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Sun Face */}
 <circle cx="0" cy="0" r="20" fill={color} />
 <path d="M-15,-5 Q0,10 15,-5" fill="none" stroke="#FDF6E3" strokeWidth="2" strokeLinecap="round" />
 <circle cx="-8" cy="-8" r="2" fill="#FDF6E3" />
 <circle cx="8" cy="-8" r="2" fill="#FDF6E3" />
 {/* Rays */}
 <path d="M0,-35 L5,-25 L0,-20 L-5,-25 Z" fill={color} />
 <path d="M0,35 L5,25 L0,20 L-5,25 Z" fill={color} />
 <path d="M-35,0 L-25,5 L-20,0 L-25,-5 Z" fill={color} />
 <path d="M35,0 L25,5 L20,0 L25,-5 Z" fill={color} />
 <path d="M-25,-25 L-18,-18 L-14,-14 L-20,-12 Z" fill={color} transform="rotate(45)" />
 <path d="M25,25 L18,18 L14,14 L20,12 Z" fill={color} transform="rotate(45)" />
 <path d="M-25,25 L-18,18 L-14,14 L-20,12 Z" fill={color} transform="rotate(-45)" />
 <path d="M25,-25 L18,-18 L14,-14 L20,12 Z" fill={color} transform="rotate(-45)" />
 {/* Secondary Rays */}
 <circle cx="0" cy="0" r="32" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 4" />
 </g>
 );
 
 case 'Kachwaha': // Jaipur - Panchranga Flag / Sun
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Shield Base */}
 <path d="M-25,-30 L25,-30 L30,0 C30,20 15,40 0,50 C-15,40 -30,20 -30,0 L-25,-30 Z" fill="none" stroke={color} strokeWidth="3" />
 {/* 5 Stripes representing Panchranga */}
 <path d="M-25,-30 L25,-30 L25,-18 L-25,-18 Z" fill={color} opacity="0.9" />
 <path d="M-26,-18 L26,-18 L26,-6 L-26,-6 Z" fill={color} opacity="0.7" />
 <path d="M-27,-6 L27,-6 L27,6 L-27,6 Z" fill={color} opacity="0.5" />
 <path d="M-28,6 L28,6 L28,18 L-28,18 Z" fill={color} opacity="0.3" />
 <path d="M-29,18 L29,18 C29,25 20,35 0,45 C-20,35 -29,25 -29,18 Z" fill={color} opacity="0.1" />
 {/* Kachnar Tree symbol simplified */}
 <circle cx="0" cy="-5" r="5" fill={color} />
 </g>
 );

 case 'Rathore': // Marwar/Bikaner - The Kite/Hawk (Cheel)
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Shield */}
 <path d="M-30,-25 L30,-25 L30,5 C30,30 0,50 0,50 C0,50 -30,30 -30,5 Z" fill="none" stroke={color} strokeWidth="2" />
 {/* Bird/Kite Silhouette */}
 <path d="M0,-15 C5,-15 10,-10 15,-15 L25,-20 L20,-5 C25,5 15,15 0,25 C-15,15 -25,5 -20,-5 L-25,-20 L-15,-15 C-10,-10 -5,-15 0,-15 Z" fill={color} />
 {/* Wings */}
 <path d="M-20,-5 L-35,5 L-20,10" fill="none" stroke={color} strokeWidth="2" />
 <path d="M20,-5 L35,5 L20,10" fill="none" stroke={color} strokeWidth="2" />
 </g>
 );

 case 'Bhati': // Jaisalmer - The Moon / Umbrella (Chatra)
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Crescent Moon */}
 <path d="M-15,10 A20,20 0 1,1 15,10 A25,25 0 1,0 -15,10 Z" fill={color} transform="rotate(-30)" />
 {/* Chatra (Royal Umbrella) above */}
 <path d="M-20,-20 Q0,-40 20,-20 L20,-15 Q0,-35 -20,-15 Z" fill={color} />
 <rect x="-2" y="-20" width="4" height="25" fill={color} />
 {/* Stars */}
 <circle cx="20" cy="0" r="3" fill={color} />
 <circle cx="-15" cy="-5" r="2" fill={color} />
 </g>
 );

 case 'Chauhan': // Bow & Arrow (from main page)
 case 'Hada': // Hada is a branch of Chauhan
 return (
 <g transform="translate(0, 0) scale(1)">
 {/* Bow & Arrow */}
 <path d="M30,20 Q80,50 30,80 M25,50 L85,50 M75,40 L85,50 L75,60" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
 </g>
 );

 case 'Parmar': // Fire / Flame (from main page)
 case 'Doda': // Doda is a branch of Parmar
 return (
 <g transform="translate(0, 0) scale(1)">
 {/* Fire Pit / Havan Kund Base */}
 <path d="M50,10 Q30,40 30,60 Q30,85 50,85 Q70,85 70,60 Q70,40 50,10 Z M50,25 Q60,45 60,60 Q60,75 50,75 Q40,75 40,60 Q40,45 50,25 Z" fill={color} />
 </g>
 );

 case 'Pratihara': // Elephant & Guard (from main page)
 return (
 <g transform="translate(0, 0) scale(1)">
 <path d="M70,30 C70,19 61,10 50,10 C39,10 30,19 30,30 C30,35 32,40 35,43 C34,45 33,48 33,51 C33,59 40,66 48,66 C49,66 50,66 51,66 C52,74 55,82 59,89 C61,93 65,94 67,91 C69,89 68,85 66,82 C63,75 61,69 60,62 C65,60 69,55 69,49 C69,46 68,43 67,41 C70,38 72,34 72,29 Z" fill={color} />
 </g>
 );

 case 'Solanki': // Sun & Geometric (from main page)
 return (
 <g transform="translate(0, 0) scale(1)">
 <circle cx="50" cy="50" r="15" fill={color} />
 <path d="M50,10 L50,25 M50,75 L50,90 M10,50 L25,50 M75,50 L90,50 M22,22 L32,32 M68,68 L78,78 M22,78 L32,68 M68,32 L78,22" stroke={color} strokeWidth="3" strokeLinecap="round" />
 </g>
 );

 case 'Jadaun': // Karauli - Lion (Yaduvanshi)
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Lion Head stylized */}
 <path d="M-20,-10 Q0,-30 20,-10 L20,10 Q25,15 20,25 Q0,40 -20,25 Q-25,15 -20,10 Z" fill={color} />
 {/* Mane */}
 <path d="M-20,-10 L-30,-5 L-25,5 L-30,15 L-20,20" fill="none" stroke={color} strokeWidth="2" />
 <path d="M20,-10 L30,-5 L25,5 L30,15 L20,20" fill="none" stroke={color} strokeWidth="2" />
 {/* Crown */}
 <path d="M-10,-10 L-10,-20 L0,-25 L10,-20 L10,-10" fill={color} />
 </g>
 );

 case 'Shekhawat': // Crossed Swords
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Shield Background */}
 <circle cx="0" cy="0" r="25" fill="none" stroke={color} strokeWidth="2" />
 {/* Sword 1 */}
 <path d="M-20,20 L20,-20" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
 <path d="M18,-22 L22,-18" fill="none" stroke={color} strokeWidth="4" /> {/* Handle */}
 {/* Sword 2 */}
 <path d="M-20,-20 L20,20" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
 <path d="M18,22 L22,18" fill="none" stroke={color} strokeWidth="4" /> {/* Handle */}
 </g>
 );

 case 'Jat': // Bharatpur - Shield/Fort
 return (
 <g transform="translate(50, 50) scale(0.8)">
 {/* Fort Bastion */}
 <path d="M-25,40 L-25,0 L-15,0 L-15,10 L-5,10 L-5,0 L5,0 L5,10 L15,10 L15,0 L25,0 L25,40 Z" fill={color} />
 {/* Base */}
 <rect x="-30" y="35" width="60" height="5" fill={color} />
 {/* Window */}
 <rect x="-5" y="20" width="10" height="10" fill="#FDF6E3" />
 </g>
 );

 default: // Royal Crown fallback
 return (
 <g transform="translate(50, 50) scale(0.8)">
 <path d="M-25,10 L-25,-10 L-15,0 L0,-20 L15,0 L25,-10 L25,10 Q0,25 -25,10 Z" fill={color} />
 <circle cx="0" cy="-25" r="3" fill={color} />
 <circle cx="-25" cy="-15" r="3" fill={color} />
 <circle cx="25" cy="-15" r="3" fill={color} />
 <rect x="-25" y="10" width="50" height="5" fill={color} />
 </g>
 );
 }
 };

 return (
 <svg 
 viewBox="0 0 100 100" 
 className={className} 
 fill="none" 
 xmlns="http://www.w3.org/2000/svg"
 >
 {getSealContent()}
 </svg>
 );
};
