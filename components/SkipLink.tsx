"use client";

import { useLocale } from "./LocaleProvider";

export function SkipLink() {
  const { content } = useLocale();
  return <a className="skip-link" href="#main">{content.ui.skipToContent}</a>;
}
