"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectImage } from "@/content/site";
import { Close, Expand } from "./Icons";
import { PerspectiveCarousel } from "./ui/perspective-carousel";
import { useLocale } from "./LocaleProvider";

export function ProjectCarousel({ images, title, projectNumber, coverImage }: { images: ProjectImage[]; title: string; projectNumber: number; coverImage?: ProjectImage }) {
  const { content } = useLocale();
  const { ui } = content;
  const safeImages = images.length ? images : [{ alt: `${title} ${ui.caseStudy}` }];
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const image = safeImages[current];
  const hasVisuals = safeImages.some((projectImage) => Boolean(projectImage.src));
  const move = (delta: number) => setCurrent(value => (value + delta + safeImages.length) % safeImages.length);
  const openGallery = () => {
    setCurrent(0);
    setOpen(true);
  };
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowLeft" && !event.defaultPrevented) move(-1);
      if (event.key === "ArrowRight" && !event.defaultPrevented) move(1);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKey);
    return () => { document.body.classList.remove("lightbox-open"); window.removeEventListener("keydown", onKey); };
  }, [open, safeImages.length]);
  const visual = (visualImage: ProjectImage) => (
    <div
      className="visual-frame"
      style={visualImage.aspectRatio ? { aspectRatio: String(visualImage.aspectRatio) } : undefined}
    >
      {visualImage.src ? <Image src={visualImage.src} alt={visualImage.alt} fill sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 46vw, 560px" quality={100} decoding="async" style={{ objectFit: visualImage.fit || "contain" }} /> : <div className="visual-placeholder"><span className="placeholder-number">{String(projectNumber).padStart(2, "0")}</span><span className="placeholder-mark" aria-hidden="true"><i/><i/><i/></span></div>}
    </div>
  );
  const visibleImage = coverImage || image;
  const gallery = open && hasVisuals && createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} ${ui.imageViewer}`} onMouseDown={e => { if (e.currentTarget === e.target) setOpen(false); }}><div ref={dialogRef} className="lightbox-dialog" onMouseDown={e => e.stopPropagation()}><div className="lightbox-toolbar"><span>{String(current + 1).padStart(2, "0")} / {String(safeImages.length).padStart(2, "0")}</span><button autoFocus className="lightbox-close" onClick={() => setOpen(false)} aria-label={ui.closeImageViewer}><Close /></button></div><PerspectiveCarousel items={safeImages.map((galleryImage) => ({ src: galleryImage.src!, title: galleryImage.caption || galleryImage.alt, alt: galleryImage.alt, aspectRatio: galleryImage.aspectRatio }))} activeIndex={current} onActiveIndexChange={setCurrent} loop fitToViewport imageFit="contain" rotationStep={34} inactiveScale={.78} transition={{ type: "spring", bounce: .1, duration: .58 }} className="perspective-gallery" viewportClassName="perspective-gallery-viewport" slideClassName="perspective-gallery-slide" imageClassName="perspective-gallery-image" labelClassName="perspective-gallery-label" controlsClassName="!border-white/25 !bg-[#102d27]/90 !text-white !shadow-none" /></div></div>,
    document.body,
  );
  return (
    <div className={`carousel${coverImage?.src ? " carousel-with-cover" : ""}`} aria-roledescription="carousel" aria-label={`${title} ${ui.carousel}`}>
      <div className="carousel-stage">{visual(visibleImage)}{hasVisuals && <button className="expand-button" onClick={openGallery} aria-label={ui.openImage}><Expand /></button>}</div>
      {gallery}
    </div>
  );
}
