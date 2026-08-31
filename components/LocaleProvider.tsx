"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { contentByLocale, defaultLocale, locales, type Locale } from "@/content/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  preloaderEpoch: number;
  content: (typeof contentByLocale)[Locale];
};
const LocaleContext = createContext<LocaleContextValue | null>(null);
const storageKey = "resta-giuliano-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [preloaderEpoch, setPreloaderEpoch] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved && locales.includes(saved as Locale)) setLocaleState(saved as Locale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : locale;
    window.localStorage.setItem(storageKey, locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setPreloaderEpoch((epoch) => epoch + 1);
    setLocaleState(nextLocale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, preloaderEpoch, content: contentByLocale[locale] }), [locale, preloaderEpoch, setLocale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
