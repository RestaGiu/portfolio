"use client";

import { useId, useState } from "react";
import type { Project } from "@/content/site";
import { ProjectCarousel } from "./ProjectCarousel";
import { useLocale } from "./LocaleProvider";

const tabs = ["problem", "discovery", "solution", "results"] as const;
type Tab = (typeof tabs)[number];
const brandLogos = {
  "app-facilita": "/brands/app-facilita.svg",
  "cv-crm": "/brands/cv-crm.svg",
} as const;

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  const { content } = useLocale();
  const { ui } = content;
  const [active, setActive] = useState<Tab>("problem");
  const uid = useId();
  const section = project[active];
  const handleKeys = (event: React.KeyboardEvent<HTMLButtonElement>, current: number) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
    setActive(tabs[next]);
    document.getElementById(uid + "-" + tabs[next] + "-tab")?.focus();
  };
  return (
    <article id={project.id} className="project-case" data-case-index={index} data-brand={project.brand} aria-labelledby={project.id + "-title"}>
      <ProjectCarousel images={project.images} title={project.shortTitle} projectNumber={index + 1} coverImage={project.coverImage} />
      <div className="project-copy">
        <div className="project-meta">
          <span>{ui.caseStudy}</span>
          <span className="project-company">
            {project.brand !== "independent" && <img src={brandLogos[project.brand]} alt="" aria-hidden="true" />}
            <span>{project.company}</span>
          </span>
        </div>
        <h3 id={project.id + "-title"}>{project.title}</h3>
        <p className="project-intro">{project.intro}</p>
        <ul className="tags" aria-label={ui.projectDisciplines}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {project.metrics.length > 0 && <div className="metrics">{project.metrics.map(metric => <div className="metric" key={metric.value + metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>}
        <div className="case-tabs" role="tablist" aria-label={`${project.title} ${ui.caseStudySections}`}>
          {tabs.map((tab, tabIndex) => <button key={tab} id={uid + "-" + tab + "-tab"} role="tab" aria-selected={active === tab} aria-controls={uid + "-panel"} tabIndex={active === tab ? 0 : -1} onKeyDown={(event) => handleKeys(event, tabIndex)} onClick={() => setActive(tab)}>{ui.tabs[tab]}</button>)}
        </div>
        <div id={uid + "-panel"} className="case-panel" role="tabpanel" aria-labelledby={uid + "-" + active + "-tab"}>
          <p>{section.lead}</p><ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>
        </div>
        {project.takeaway && <blockquote>{project.takeaway}</blockquote>}
      </div>
    </article>
  );
}
