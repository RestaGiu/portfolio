"use client";

import { useMemo, useRef, useState } from "react";
import { type ProjectCategory } from "@/content/site";
import StackedSections from "./animata/scroll/stacked-sections";
import { ProjectCase } from "./ProjectCase";
import { useLocale } from "./LocaleProvider";

export function Projects() {
  const { content } = useLocale();
  const { projects, projectFilters, ui } = content;
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all");
  const deckStartRef = useRef<HTMLDivElement>(null);
  const visibleProjects = useMemo(() => activeFilter === "all" ? projects : projects.filter((project) => project.categories.includes(activeFilter)), [activeFilter, projects]);
  const selectFilter = (filter: "all" | ProjectCategory) => {
    setActiveFilter(filter);
    requestAnimationFrame(() => deckStartRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  };

  return (
    <section id="projects" className="projects shell" aria-labelledby="projects-title">
      <div className="projects-heading">
        <div><p className="projects-intro">{ui.selectedWork}</p><h2 id="projects-title">{ui.projectsTitle}</h2><p>{ui.projectsDescription}</p></div>
        <span>{projects.length} {ui.caseStudies}</span>
      </div>
      <nav className="project-filters" aria-label={ui.filterCaseStudies}>
        <div className="project-filter-scroll">
          <button type="button" aria-pressed={activeFilter === "all"} onClick={() => selectFilter("all")}>{ui.allWork}</button>
          {projectFilters.map((filter) => <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} onClick={() => selectFilter(filter.id)}>{filter.label}</button>)}
        </div>
        <span className="project-filter-status" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? ui.caseShown : ui.casesShown}</span>
      </nav>
      <div ref={deckStartRef} className="project-deck-anchor">
        <StackedSections className="project-stack" stackOffset={34} stickyTop={60} disableStackOnMobile minViewportHeightForStack={1160} paneGap={false} scrollRunway="min(42vh, 24rem)">
          {visibleProjects.map((project) => <ProjectCase key={project.id} project={project} index={projects.indexOf(project)} />)}
        </StackedSections>
      </div>
    </section>
  );
}
