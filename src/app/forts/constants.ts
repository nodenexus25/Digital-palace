import { Monument } from "@/types/frontend";

export const DYNASTY_SEALS: Record<string, { symbol: string; color: string; label: string }> = {
 'Sisodia': { symbol: '', color: '#D4B483', label: 'Sisodia (Mewar)' },
 'Kachwaha': { symbol: '', color: '#FF9933', label: 'Kachwaha (Jaipur)' },
 'Rathore': { symbol: '', color: '#E53935', label: 'Rathore (Marwar)' },
 'Bhati': { symbol: '', color: '#FDD835', label: 'Bhati (Jaisalmer)' },
 'Chauhan': { symbol: '', color: '#D84315', label: 'Chauhan' },
 'Doda': { symbol: '', color: '#8D6E63', label: 'Doda' },
 'Jadaun': { symbol: '', color: '#FBC02D', label: 'Jadaun' },
 'Jat': { symbol: '', color: '#795548', label: 'Jat' },
 'Hada': { symbol: '', color: '#5D4037', label: 'Hada Chauhan' },
 'Shekhawat': { symbol: '', color: '#8B4513', label: 'Shekhawat' },
};

export const getDynastyInfo = (monument: Monument) => {
 let key = 'Royal';
 if (monument.dynasty && DYNASTY_SEALS[monument.dynasty]) {
 key = monument.dynasty;
 } else {
 const builtBy = monument.builtBy || '';
 const location = monument.location || '';
 
 if (builtBy.includes('Maurya') || builtBy.includes('Kumbha') || location.includes('Udaipur') || location.includes('Chittorgarh') || location.includes('Dungarpur') || location.includes('Rajsamand')) key = 'Sisodia';
 else if (builtBy.includes('Man Singh') || builtBy.includes('Jai Singh') || location.includes('Jaipur') || location.includes('Amer') || location.includes('Alwar') || location.includes('Neemrana')) key = 'Kachwaha';
 else if (builtBy.includes('Jodha') || location.includes('Jodhpur') || builtBy.includes('Bika') || location.includes('Bikaner') || location.includes('Nagaur')) key = 'Rathore';
 else if (builtBy.includes('Jaisal') || location.includes('Jaisalmer')) key = 'Bhati';
 else if (builtBy.includes('Chauhan') || location.includes('Ranthambore') || location.includes('Ajmer')) key = 'Chauhan';
 else if (location.includes('Bharatpur')) key = 'Jat';
 else if (location.includes('Bundi') || location.includes('Kota') || location.includes('Jhalawar')) key = 'Hada';
 else if (location.includes('Karauli')) key = 'Jadaun';
 else if (location.includes('Mandawa') || location.includes('Alsisar') || location.includes('Samode') || location.includes('Nawalgarh') || location.includes('Jhunjhunu') || location.includes('Sikar')) key = 'Shekhawat';
 else if (location.includes('Gagron')) key = 'Doda';
 else if (location.includes('Banswara')) key = 'Sisodia';
 else if (location.includes('Pratapgarh')) key = 'Sisodia';
 }
 
 const info = DYNASTY_SEALS[key] || { symbol: '', color: '#8B4513', label: 'Royal' };
 return { ...info, key };
};
