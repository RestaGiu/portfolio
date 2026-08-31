"use client";

import { contact } from "@/content/site";
import { ArrowUpRight } from "./Icons";
import { locales, type Locale } from "@/content/i18n";
import { useLocale } from "./LocaleProvider";

const languageNames: Record<Locale, string> = { en: "English", it: "Italiano", pt: "Português" };

export function Header() {
  const { locale, setLocale, content } = useLocale();
  const { ui } = content;
  const linkedin = contact.linkedin || "#contact";
  return (
    <header className="site-header">
      <a href="#main" className="brand" aria-label={ui.backToTop}><span className="brand-mark"><img src="/icon.png" alt="" aria-hidden="true" /></span><span className="brand-name">Resta Giuliano</span></a>
      <nav aria-label={ui.primaryNavigation}>
        <a href="#about">{ui.about}</a><a href="#projects">{ui.projects}</a>
        <a href={linkedin} {...(contact.linkedin ? { target: "_blank", rel: "noreferrer" } : {})}>LinkedIn <ArrowUpRight size={13} /></a>
        <a href="#contact">{ui.contact}</a>
        <div className="language-switcher" role="group" aria-label={ui.language}>
          {locales.map((item) => <button key={item} type="button" aria-label={languageNames[item]} aria-pressed={locale === item} onClick={() => setLocale(item)}>{item}</button>)}
        </div>
      </nav>
    </header>
  );
}
