export type AnimalType =
  | 'unicorn' | 'cat' | 'dog' | 'rabbit' | 'lion' | 'elephant' | 'duck' | 'penguin';

export const ANIMAL_COLORS: Record<AnimalType, string> = {
  unicorn: '#e879f9',
  cat: '#fb923c',
  dog: '#a78bfa',
  rabbit: '#f472b6',
  lion: '#fbbf24',
  elephant: '#94a3b8',
  duck: '#facc15',
  penguin: '#64748b',
};

const svgs: Record<AnimalType, string> = {
  unicorn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <!-- body -->
    <ellipse cx="32" cy="42" rx="18" ry="13" fill="#f9d5fa"/>
    <!-- head -->
    <ellipse cx="44" cy="27" rx="11" ry="10" fill="#f9d5fa"/>
    <!-- horn -->
    <polygon points="50,10 46,26 54,26" fill="#f59e0b"/>
    <!-- ear -->
    <polygon points="38,20 42,14 46,20" fill="#e879f9"/>
    <!-- eye -->
    <circle cx="47" cy="26" r="2" fill="#7c3aed"/>
    <!-- smile -->
    <path d="M44 31 Q47 34 50 31" stroke="#d946ef" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- mane -->
    <path d="M38 18 Q34 24 36 32" stroke="#f472b6" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M36 18 Q30 26 32 34" stroke="#a78bfa" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- legs -->
    <rect x="18" y="52" width="5" height="10" rx="2" fill="#f9d5fa"/>
    <rect x="25" y="52" width="5" height="10" rx="2" fill="#f9d5fa"/>
    <rect x="32" y="52" width="5" height="10" rx="2" fill="#f9d5fa"/>
    <rect x="39" y="52" width="5" height="10" rx="2" fill="#f9d5fa"/>
    <!-- tail -->
    <path d="M14 38 Q8 30 12 22" stroke="#e879f9" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M14 38 Q6 32 10 24" stroke="#a78bfa" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  cat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="42" rx="16" ry="12" fill="#fed7aa"/>
    <ellipse cx="32" cy="26" rx="13" ry="12" fill="#fed7aa"/>
    <!-- ears -->
    <polygon points="20,16 24,8 28,16" fill="#fb923c"/>
    <polygon points="36,16 40,8 44,16" fill="#fb923c"/>
    <!-- inner ears -->
    <polygon points="21,15 24,10 27,15" fill="#fda4af"/>
    <polygon points="37,15 40,10 43,15" fill="#fda4af"/>
    <!-- eyes -->
    <ellipse cx="27" cy="25" rx="2.5" ry="3" fill="#16a34a"/>
    <ellipse cx="37" cy="25" rx="2.5" ry="3" fill="#16a34a"/>
    <circle cx="27" cy="26" r="1.2" fill="#111"/>
    <circle cx="37" cy="26" r="1.2" fill="#111"/>
    <!-- nose -->
    <polygon points="32,31 30,33 34,33" fill="#fda4af"/>
    <!-- whiskers -->
    <line x1="20" y1="31" x2="29" y2="32" stroke="#888" stroke-width="1"/>
    <line x1="20" y1="33" x2="29" y2="33" stroke="#888" stroke-width="1"/>
    <line x1="35" y1="32" x2="44" y2="31" stroke="#888" stroke-width="1"/>
    <line x1="35" y1="33" x2="44" y2="33" stroke="#888" stroke-width="1"/>
    <!-- smile -->
    <path d="M30 34 Q32 36 34 34" stroke="#fb923c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- legs -->
    <rect x="20" y="51" width="5" height="9" rx="2" fill="#fed7aa"/>
    <rect x="27" y="51" width="5" height="9" rx="2" fill="#fed7aa"/>
    <rect x="32" y="51" width="5" height="9" rx="2" fill="#fed7aa"/>
    <rect x="39" y="51" width="5" height="9" rx="2" fill="#fed7aa"/>
    <!-- tail -->
    <path d="M16 44 Q8 38 12 28" stroke="#fb923c" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  dog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="42" rx="17" ry="12" fill="#ddd6fe"/>
    <ellipse cx="32" cy="26" rx="13" ry="12" fill="#ddd6fe"/>
    <!-- floppy ears -->
    <ellipse cx="20" cy="23" rx="5" ry="9" fill="#a78bfa" transform="rotate(-15 20 23)"/>
    <ellipse cx="44" cy="23" rx="5" ry="9" fill="#a78bfa" transform="rotate(15 44 23)"/>
    <!-- eyes -->
    <circle cx="27" cy="24" r="3" fill="#fff"/>
    <circle cx="37" cy="24" r="3" fill="#fff"/>
    <circle cx="27" cy="25" r="1.8" fill="#7c2d12"/>
    <circle cx="37" cy="25" r="1.8" fill="#7c2d12"/>
    <circle cx="27.8" cy="24.2" r="0.7" fill="#fff"/>
    <circle cx="37.8" cy="24.2" r="0.7" fill="#fff"/>
    <!-- nose -->
    <ellipse cx="32" cy="31" rx="4" ry="3" fill="#7c2d12"/>
    <!-- smile -->
    <path d="M27 35 Q32 39 37 35" stroke="#a78bfa" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- tongue -->
    <ellipse cx="32" cy="37" rx="3" ry="2" fill="#fda4af"/>
    <!-- legs -->
    <rect x="18" y="51" width="5" height="10" rx="2" fill="#ddd6fe"/>
    <rect x="25" y="51" width="5" height="10" rx="2" fill="#ddd6fe"/>
    <rect x="34" y="51" width="5" height="10" rx="2" fill="#ddd6fe"/>
    <rect x="41" y="51" width="5" height="10" rx="2" fill="#ddd6fe"/>
    <!-- tail -->
    <path d="M49 36 Q58 28 54 20" stroke="#a78bfa" stroke-width="3" fill="none" stroke-linecap="round"/>
  </svg>`,

  rabbit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="43" rx="15" ry="12" fill="#fce7f3"/>
    <ellipse cx="32" cy="29" rx="12" ry="11" fill="#fce7f3"/>
    <!-- tall ears -->
    <ellipse cx="24" cy="12" rx="5" ry="12" fill="#fce7f3"/>
    <ellipse cx="40" cy="12" rx="5" ry="12" fill="#fce7f3"/>
    <ellipse cx="24" cy="12" rx="2.5" ry="9" fill="#fda4af"/>
    <ellipse cx="40" cy="12" rx="2.5" ry="9" fill="#fda4af"/>
    <!-- eyes -->
    <circle cx="27" cy="28" r="2.5" fill="#f43f5e"/>
    <circle cx="37" cy="28" r="2.5" fill="#f43f5e"/>
    <circle cx="27.7" cy="27.3" r="0.8" fill="#fff"/>
    <circle cx="37.7" cy="27.3" r="0.8" fill="#fff"/>
    <!-- nose -->
    <circle cx="32" cy="33" r="2" fill="#fb7185"/>
    <!-- whiskers -->
    <line x1="20" y1="33" x2="29" y2="34" stroke="#ccc" stroke-width="0.8"/>
    <line x1="35" y1="34" x2="44" y2="33" stroke="#ccc" stroke-width="0.8"/>
    <!-- smile -->
    <path d="M30 35 Q32 37 34 35" stroke="#f472b6" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- legs/feet -->
    <ellipse cx="24" cy="55" rx="7" ry="4" fill="#fce7f3"/>
    <ellipse cx="40" cy="55" rx="7" ry="4" fill="#fce7f3"/>
    <!-- puff tail -->
    <circle cx="17" cy="44" r="4" fill="#fff"/>
  </svg>`,

  lion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <!-- mane -->
    <circle cx="32" cy="30" r="18" fill="#f59e0b"/>
    <ellipse cx="32" cy="43" rx="16" ry="11" fill="#fef3c7"/>
    <!-- face -->
    <circle cx="32" cy="27" r="13" fill="#fde68a"/>
    <!-- ears -->
    <circle cx="20" cy="16" r="5" fill="#f59e0b"/>
    <circle cx="44" cy="16" r="5" fill="#f59e0b"/>
    <circle cx="20" cy="16" r="2.5" fill="#fda4af"/>
    <circle cx="44" cy="16" r="2.5" fill="#fda4af"/>
    <!-- eyes -->
    <circle cx="26" cy="25" r="3.5" fill="#fff"/>
    <circle cx="38" cy="25" r="3.5" fill="#fff"/>
    <circle cx="26" cy="26" r="2" fill="#92400e"/>
    <circle cx="38" cy="26" r="2" fill="#92400e"/>
    <circle cx="26.8" cy="25.2" r="0.7" fill="#fff"/>
    <circle cx="38.8" cy="25.2" r="0.7" fill="#fff"/>
    <!-- nose -->
    <ellipse cx="32" cy="31" rx="4" ry="2.5" fill="#d97706"/>
    <!-- smile -->
    <path d="M27 35 Q32 39 37 35" stroke="#d97706" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- legs -->
    <rect x="19" y="51" width="5" height="9" rx="2" fill="#fef3c7"/>
    <rect x="26" y="51" width="5" height="9" rx="2" fill="#fef3c7"/>
    <rect x="33" y="51" width="5" height="9" rx="2" fill="#fef3c7"/>
    <rect x="40" y="51" width="5" height="9" rx="2" fill="#fef3c7"/>
    <!-- tail with tuft -->
    <path d="M50 40 Q58 32 55 22" stroke="#f59e0b" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="54" cy="21" r="4" fill="#f59e0b"/>
  </svg>`,

  elephant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="43" rx="19" ry="13" fill="#cbd5e1"/>
    <circle cx="32" cy="26" r="14" fill="#cbd5e1"/>
    <!-- ears -->
    <ellipse cx="15" cy="27" rx="8" ry="11" fill="#94a3b8"/>
    <ellipse cx="49" cy="27" rx="8" ry="11" fill="#94a3b8"/>
    <ellipse cx="15" cy="27" rx="5" ry="8" fill="#fda4af" opacity="0.6"/>
    <!-- trunk -->
    <path d="M28 36 Q24 44 26 52 Q28 56 32 56 Q34 54 32 52 Q30 46 32 40" stroke="#94a3b8" stroke-width="6" fill="none" stroke-linecap="round"/>
    <!-- eyes -->
    <circle cx="25" cy="23" r="3" fill="#fff"/>
    <circle cx="39" cy="23" r="3" fill="#fff"/>
    <circle cx="25" cy="24" r="1.8" fill="#1e293b"/>
    <circle cx="39" cy="24" r="1.8" fill="#1e293b"/>
    <circle cx="25.6" cy="23.4" r="0.6" fill="#fff"/>
    <circle cx="39.6" cy="23.4" r="0.6" fill="#fff"/>
    <!-- smile -->
    <path d="M28 32 Q32 35 36 32" stroke="#94a3b8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <!-- tusks -->
    <path d="M29 37 Q25 42 22 42" stroke="#fef9c3" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M35 37 Q39 42 42 42" stroke="#fef9c3" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- legs -->
    <rect x="16" y="53" width="7" height="9" rx="3" fill="#94a3b8"/>
    <rect x="25" y="53" width="7" height="9" rx="3" fill="#94a3b8"/>
    <rect x="32" y="53" width="7" height="9" rx="3" fill="#94a3b8"/>
    <rect x="41" y="53" width="7" height="9" rx="3" fill="#94a3b8"/>
  </svg>`,

  duck: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="44" rx="18" ry="13" fill="#fef08a"/>
    <circle cx="40" cy="26" r="13" fill="#fef08a"/>
    <!-- wing -->
    <ellipse cx="25" cy="44" rx="10" ry="7" fill="#fde047" transform="rotate(-20 25 44)"/>
    <!-- eye -->
    <circle cx="44" cy="23" r="3" fill="#fff"/>
    <circle cx="44.5" cy="23.5" r="1.8" fill="#1e293b"/>
    <circle cx="45.1" cy="22.8" r="0.6" fill="#fff"/>
    <!-- bill -->
    <path d="M49 27 L56 25 L56 30 L49 30 Z" fill="#f97316"/>
    <!-- cheek -->
    <circle cx="46" cy="28" r="2" fill="#fca5a5" opacity="0.7"/>
    <!-- legs -->
    <line x1="27" y1="57" x2="22" y2="62" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="27" y1="57" x2="27" y2="63" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="37" y1="57" x2="32" y2="62" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="37" y1="57" x2="37" y2="63" stroke="#f97316" stroke-width="2.5" stroke-linecap="round"/>
    <!-- tail feather -->
    <path d="M14 40 Q6 36 8 28" stroke="#fde047" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`,

  penguin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <!-- body -->
    <ellipse cx="32" cy="43" rx="16" ry="17" fill="#1e293b"/>
    <!-- white belly -->
    <ellipse cx="32" cy="45" rx="10" ry="13" fill="#f1f5f9"/>
    <!-- head -->
    <circle cx="32" cy="22" r="13" fill="#1e293b"/>
    <!-- white face -->
    <ellipse cx="32" cy="25" rx="9" ry="8" fill="#f1f5f9"/>
    <!-- eyes -->
    <circle cx="27" cy="22" r="3.5" fill="#fff"/>
    <circle cx="37" cy="22" r="3.5" fill="#fff"/>
    <circle cx="27" cy="23" r="2.2" fill="#1e293b"/>
    <circle cx="37" cy="23" r="2.2" fill="#1e293b"/>
    <circle cx="27.8" cy="22.2" r="0.8" fill="#fff"/>
    <circle cx="37.8" cy="22.2" r="0.8" fill="#fff"/>
    <!-- beak -->
    <polygon points="29,29 32,34 35,29" fill="#f97316"/>
    <!-- wings -->
    <ellipse cx="15" cy="44" rx="5" ry="11" fill="#1e293b" transform="rotate(-15 15 44)"/>
    <ellipse cx="49" cy="44" rx="5" ry="11" fill="#1e293b" transform="rotate(15 49 44)"/>
    <!-- feet -->
    <ellipse cx="25" cy="59" rx="7" ry="3" fill="#f97316"/>
    <ellipse cx="39" cy="59" rx="7" ry="3" fill="#f97316"/>
    <!-- scarf -->
    <rect x="19" y="30" width="26" height="5" rx="2" fill="#ef4444"/>
    <circle cx="22" cy="32" r="2" fill="#dc2626"/>
    <circle cx="27" cy="32" r="2" fill="#dc2626"/>
  </svg>`,
};

export function getAnimalSvg(animal: AnimalType): string {
  return svgs[animal] ?? svgs.cat;
}

export const ANIMAL_NAMES: Record<AnimalType, string> = {
  unicorn: 'unicorn',
  cat: 'cat',
  dog: 'dog',
  rabbit: 'rabbit',
  lion: 'lion',
  elephant: 'elephant',
  duck: 'duck',
  penguin: 'penguin',
};
