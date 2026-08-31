"use client";

import { useEffect, useState } from "react";
import { useLocale } from "./LocaleProvider";

const STORAGE_KEY = "resta-giuliano-cookie-consent";
type Consent = "accepted" | "rejected";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

function loadClarityScript() {
  if (typeof window === "undefined" || window.clarity) return;

  window.clarity = window.clarity || function (...args: unknown[]) {
    const clarity = window.clarity;
    if (!clarity) return;
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  };

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://www.clarity.ms/tag/yb60k6qmy8";
  document.head.appendChild(script);
}

export function CookieConsent() {
  const { locale } = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  const copy = {
    en: {
      title: "Hey",
      text: "I want to understand better how recruiters and hiring teams are navigating the portfolio and offer the best experience. Want to accept cookies?",
      reject: "No thanks",
      accept: "Accept cookies",
      ariaLabel: "Cookie settings",
    },
    it: {
      title: "Ehi",
      text: "Voglio capire meglio come recruiter e team di hiring stanno navigando nel portfolio e offrire la migliore esperienza. Ti va di accettare i cookie?",
      reject: "No grazie",
      accept: "Accetta i cookie",
      ariaLabel: "Impostazioni cookie",
    },
    pt: {
      title: "Ei",
      text: "Quero entender melhor como recrutadores e times de hiring estão navegando no portfólio e oferecer a melhor experiência. Que tal aceitar os cookies?",
      reject: "Não, obrigado",
      accept: "Aceitar cookies",
      ariaLabel: "Configurações de cookies",
    },
  } as const;

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(STORAGE_KEY) as Consent | null;

    if (savedConsent === "accepted") {
      loadClarityScript();
      setIsVisible(false);
      return;
    }

    if (savedConsent === "rejected") {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
  }, []);

  const handleConsent = (value: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    if (value === "accepted") loadClarityScript();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const labels = copy[locale] ?? copy.en;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={labels.ariaLabel}>
      <div className="cookie-consent__content">
        <div className="cookie-consent__text">
          <strong>{labels.title}</strong>
          <p>{labels.text}</p>
        </div>
        <div className="cookie-consent__actions">
          <button type="button" className="cookie-consent__button cookie-consent__button--secondary" onClick={() => handleConsent("rejected")}>
            {labels.reject}
          </button>
          <button type="button" className="cookie-consent__button cookie-consent__button--primary" onClick={() => handleConsent("accepted")}>
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
