"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import "./stacked-sections.css";

export type StackedSectionsProps = {
  /**
   * One pane per direct child — sticky card > inner content (scale only).
   * Siblings in one deck so every sticky shares the deck scroll range (stacking-cards pattern).
   */
  children?: React.ReactNode;
  /** Scale covered panes while the next card rises into pin. @default true */
  withDramaEffect?: boolean;
  /**
   * Stagger between stacked panes (`padding-top` on each sticky card, 1-based index).
   * Match peek strip height. @default 48
   */
  stackOffset?: number;
  /** Tailwind gap classes between cards (block `gap-*`). Pass `false` to disable. @default `gap-2` */
  paneGap?: false | string;
  /**
   * In-flow spacer height after the last card so the final pane stays pinned through the outro scroll.
   * @default `0px`
   */
  scrollRunway?: string;
  /** Distance from the viewport top where cards pin. @default 0 */
  stickyTop?: number;
  /** Keep cards in normal document flow on narrow screens. @default false */
  disableStackOnMobile?: boolean;
  /**
   * Minimum viewport height required for the deck treatment. Below this, every
   * pane uses the same readable linear flow. @default 0
   */
  minViewportHeightForStack?: number;
  className?: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let element = node?.parentElement ?? null;
  while (element && element !== document.body && element !== document.documentElement) {
    const overflowY = getComputedStyle(element).overflowY;
    if (overflowY === "auto" || overflowY === "scroll") {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}

export default function StackedSections({
  children,
  withDramaEffect = true,
  stackOffset = 48,
  paneGap = "gap-2",
  scrollRunway = "0px",
  stickyTop = 0,
  disableStackOnMobile = false,
  minViewportHeightForStack = 0,
  className,
}: StackedSectionsProps) {
  const deckRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = React.useState(false);
  const [viewportSupportsStack, setViewportSupportsStack] = React.useState(false);

  const items = React.Children.toArray(children);
  const total = items.length;
  cardRefs.current.length = total;
  contentRefs.current.length = total;

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  // The deck mode is a viewport-level decision, never a per-card decision.
  // That keeps every case in the same reading mode for a given screen size.
  React.useEffect(() => {
    const update = () => {
      setViewportSupportsStack(window.innerHeight >= minViewportHeightForStack);
    };

    update();
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
    };
  }, [minViewportHeightForStack]);

  const isStackingEnabled = viewportSupportsStack && !(disableStackOnMobile && isMobile);

  const scaleAtDepth = React.useCallback(
    (cardIndex: number) => {
      const reverseIndex = total - (cardIndex - 1);
      return 1.1 - 0.1 * reverseIndex;
    },
    [total],
  );

  // Scale on `.card__content` only. Each pane freezes once the next card has pinned.
  React.useEffect(() => {
    if (!withDramaEffect || total === 0 || !isStackingEnabled) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const deck = deckRef.current;
    if (!deck) {
      return;
    }

    const scroller = getScrollParent(deck);
    let frame = 0;

    const isNextCardPinned = (cardIndex: number, containerTop: number) => {
      const nextCard = cardRefs.current[cardIndex + 1];
      if (!nextCard) {
        return false;
      }
      return (
        nextCard.getBoundingClientRect().top - containerTop <= (cardIndex + 1) * stackOffset + 1
      );
    };

    const update = () => {
      frame = 0;
      const containerTop = (scroller ? scroller.getBoundingClientRect().top : 0) + stickyTop;

      for (let i = 0; i < total; i++) {
        const card = cardRefs.current[i];
        const content = contentRefs.current[i];
        if (!card || !content) {
          continue;
        }

        const endScale = scaleAtDepth(i + 1);
        const covered = isNextCardPinned(i, containerTop);

        if (covered) {
          content.dataset.stackedCovered = "";
          content.style.transform = `scale(${endScale})`;
          continue;
        }

        delete content.dataset.stackedCovered;

        const nextCard = cardRefs.current[i + 1];
        if (!nextCard) {
          content.style.transform = "";
          continue;
        }

        const pinnedTop = (i + 1) * stackOffset;
        const offset = nextCard.getBoundingClientRect().top - containerTop - pinnedTop;
        const rowH = card.offsetHeight > 0 ? card.offsetHeight : 1;
        const distance = Math.max(rowH - pinnedTop, 1);
        const progress = clamp(1 - offset / distance, 0, 1);
        const scale = 1 + (endScale - 1) * progress;
        content.style.transform = progress <= 0.001 ? "" : `scale(${scale})`;
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    const target: Window | HTMLElement = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
      for (const content of contentRefs.current) {
        if (content) {
          delete content.dataset.stackedCovered;
          content.style.transform = "";
        }
      }
    };
  }, [total, stackOffset, stickyTop, withDramaEffect, isStackingEnabled, scaleAtDepth]);

  if (total === 0) {
    return null;
  }

  const gapClass = paneGap === false ? undefined : paneGap;

  return (
    <>
      <div
        ref={deckRef}
        data-stacked-deck=""
        data-stacked-mobile-disabled={disableStackOnMobile ? "" : undefined}
        data-stacked-disabled={isStackingEnabled ? undefined : ""}
        className={cn("flex w-full flex-col", gapClass, className)}
        style={
          {
            "--numcards": total,
            "--stacked-top-offset": `${stackOffset}px`,
            paddingBottom: isStackingEnabled ? `calc(${total} * ${stackOffset}px)` : 0,
          } as React.CSSProperties
        }
      >
        {items.map((child, index) => {
          const key =
            React.isValidElement(child) && child.key != null ? child.key : `pane-${index}`;
          const cardIndex = index + 1;

          return (
            <div
              key={key}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-stacked-card=""
              className={isStackingEnabled ? "sticky top-0 w-full" : "relative w-full"}
              style={
                {
                  "--index": cardIndex,
                  zIndex: cardIndex,
                  top: isStackingEnabled ? stickyTop : "auto",
                  paddingTop: isStackingEnabled ? `calc(${cardIndex} * var(--stacked-top-offset))` : 0,
                } as React.CSSProperties
              }
            >
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                data-stacked-content=""
                className="min-h-0 origin-[50%_0%]"
              >
                {child}
              </div>
            </div>
          );
        })}
        {isStackingEnabled && scrollRunway !== "0px" ? (
          <div
            aria-hidden
            className="w-full shrink-0"
            style={{ height: scrollRunway }}
            data-stacked-runway=""
          />
        ) : null}
      </div>
    </>
  );
}
