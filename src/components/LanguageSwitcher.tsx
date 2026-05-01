import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'he', label: 'HE' },
  { code: 'nl', label: 'NL' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const change = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    document.documentElement.dir = code === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  };

  return (
    <div className="lang-switcher">
      {LANGS.map(l => (
        <button
          key={l.code}
          className={`lang-btn ${i18n.language === l.code ? 'active' : ''}`}
          onClick={() => change(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
