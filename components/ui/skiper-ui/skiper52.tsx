"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";

type HoverExpandImage = { src: string; alt: string; code: string };
type HoverExpandProject = {
  id: string; company: string; shortTitle: string; title: string; intro: string; tags: string[];
  metrics: { value: string; label: string }[]; images: { src?: string; alt: string }[];
};
type HoverExpandProps = { projects?: HoverExpandProject[]; images?: HoverExpandImage[]; className?: string };

export function HoverExpand_001({ projects, images, className = "" }: HoverExpandProps) {
  const fallbackProjects: HoverExpandProject[] = (images ?? []).map((image, index) => ({
    id: `image-${index}`, company: image.code, shortTitle: image.alt, title: image.alt, intro: "", tags: [], metrics: [], images: [image],
  }));
  const items = projects?.length ? projects : fallbackProjects;
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const labelId = useId();
  if (!items.length) return null;

  const moveFocus = (currentIndex: number, direction: -1 | 1) => {
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    setActiveIndex(nextIndex);
    document.getElementById(`${labelId}-project-${nextIndex}`)?.focus();
  };

  return (
    <div className={`hover-expand ${className}`} aria-label="Selected project case studies">
      <div className="hover-expand-track" role="list">
        {items.map((project, index) => {
          const isActive = activeIndex === index;
          const image = project.images[0];
          return (
            <motion.button
              id={`${labelId}-project-${index}`}
              key={project.id}
              type="button"
              role="listitem"
              className="hover-expand-card"
              data-active={isActive}
              data-tone={index}
              aria-pressed={isActive}
              aria-label={`${project.shortTitle}. ${isActive ? "Expanded" : "Expand project"}`}
              animate={shouldReduceMotion ? undefined : { flexGrow: isActive ? 5.4 : 1 }}
              transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") { event.preventDefault(); moveFocus(index, 1); }
                if (event.key === "ArrowLeft") { event.preventDefault(); moveFocus(index, -1); }
                if (event.key === "Home") { event.preventDefault(); setActiveIndex(0); document.getElementById(`${labelId}-project-0`)?.focus(); }
                if (event.key === "End") { event.preventDefault(); const last = items.length - 1; setActiveIndex(last); document.getElementById(`${labelId}-project-${last}`)?.focus(); }
              }}
            >
              {image?.src ? <img className="hover-expand-image" src={image.src} alt="" /> : <span className="hover-expand-art" aria-hidden="true"><i /><i /><i /></span>}
              <span className="hover-expand-shade" aria-hidden="true" />
              <span className="hover-expand-code">{String(index + 1).padStart(2, "0")}</span>
              <span className="hover-expand-collapsed"><span>{project.company}</span><strong>{project.shortTitle}</strong></span>
              <span className="hover-expand-detail" aria-hidden={!isActive}>
                <span className="hover-expand-company">{project.company}</span>
                <span className="hover-expand-title">{project.title}</span>
                {project.intro && <span className="hover-expand-intro">{project.intro}</span>}
                {project.metrics[0] && <span className="hover-expand-metric"><strong>{project.metrics[0].value}</strong><small>{project.metrics[0].label}</small></span>}
                {project.tags.length > 0 && <span className="hover-expand-tags">{project.tags.slice(0, 3).map(tag => <small key={tag}>{tag}</small>)}</span>}
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="hover-expand-help">Hover, tap or use the arrow keys to explore a case study.</p>
    </div>
  );
}

export function Skiper52() { return <HoverExpand_001 images={[]} />; }
