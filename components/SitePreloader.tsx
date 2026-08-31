"use client";

import { useCallback } from "react";
import SplitReveal from "./animata/preloader/split-reveal";
import { useLocale } from "./LocaleProvider";

export function SitePreloader() {
  const { content, preloaderEpoch } = useLocale();
  const preparePage = useCallback(async ({ report, signal }: { report: (progress: { loaded: number; total: number }) => void; signal: AbortSignal }) => {
    report({ loaded: 0, total: 1 });

    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => window.setTimeout(resolve, 1200)),
    ]);

    if (!signal.aborted) {
      report({ loaded: 1, total: 1 });
    }
  }, []);

  return (
    <SplitReveal
      key={preloaderEpoch}
      lockScroll
      backgroundColor="var(--deep)"
      foregroundColor="var(--white)"
      holdMs={120}
      progressFadeMs={180}
      revealDuration={0.72}
    >
      <SplitReveal.Task run={preparePage} />
      <SplitReveal.Overlay className="site-preloader" aria-label={content.ui.loadingPortfolio}>
        <SplitReveal.Shutter side="top" />
        <SplitReveal.Shutter side="bottom" />
        <SplitReveal.Progress>
          {({ progress }) => (
            <div className="site-preloader-content" role="status">
              <span className="site-preloader-mark" aria-hidden="true">Resta Giuliano</span>
              <div className="site-preloader-label"><span>{content.ui.preloader}</span><strong>{progress}%</strong></div>
              <span className="site-preloader-track"><i style={{ transform: `scaleX(${progress / 100})` }} /></span>
            </div>
          )}
        </SplitReveal.Progress>
      </SplitReveal.Overlay>
    </SplitReveal>
  );
}
