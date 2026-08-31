"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "./LocaleProvider";

const MotionImage = motion.create(Image);

export function AboutSummary() {
  const { content } = useLocale();
  const { capabilities, profile, ui, workHistory } = content;
  const [activeTab, setActiveTab] = useState("about");
  const [hasProfileImage, setHasProfileImage] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const tabs = [
    { id: "about", label: ui.aboutTabs.about, profileImage: "/profile/photoperfil-0.png", content: <><p>{ui.aboutParagraphs[0]}</p><p>{ui.aboutParagraphs[1]}</p><ul className="about-facts">{profile.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul></> },
    { id: "skills", label: ui.aboutTabs.skills, profileImage: "/profile/photoperfil-1.png", content: <SkillList groups={[{ title: ui.productDesign, items: capabilities.skills }, { title: "Tools", items: capabilities.tools }]} /> },
    { id: "experience", label: ui.aboutTabs.experience, profileImage: "/profile/photoperfil-2.png", content: <SkillList groups={workHistory} /> },
    { id: "languages", label: ui.aboutTabs.languages, profileImage: "/profile/photoperfil-3.png", content: <SkillList groups={[{ title: ui.aboutTabs.languages, items: capabilities.languages }]} /> },
  ];
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="about shell" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <aside className="about-profile-card" aria-label={ui.profileArtwork}>
          {hasProfileImage ? (
            <div className="about-profile-art">
              <AnimatePresence initial={false} mode="sync">
                <MotionImage
                  key={active.profileImage}
                  className="about-profile-svg"
                  src={active.profileImage}
                  alt={`Resta Giuliano — ${active.label}`}
                  fill
                  sizes="(max-width: 1000px) 92vw, 410px"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, rotate: -1.5, scale: 0.98 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, rotate: 1, scale: 0.985 }}
                  transition={{ duration: shouldReduceMotion ? 0.15 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                  onError={() => setHasProfileImage(false)}
                />
              </AnimatePresence>
            </div>
          ) : (
            <div className="about-profile-fallback" aria-hidden="true">RG</div>
          )}
          <div className="about-profile-caption"><span>Resta Giuliano</span><small>{profile.role}</small></div>
        </aside>

        <div className="about-content">
          <p className="about-intro">{ui.aboutIntro}</p>
          <h2 id="about-title">{ui.aboutTitle}</h2>
          <div className="about-tabs" role="tablist" aria-label={ui.professionalProfile}>
            {tabs.map((tab) => (
              <button key={tab.id} id={`${tab.id}-tab`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`${tab.id}-panel`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="about-tab-panel" id={`${active.id}-panel`} role="tabpanel" aria-labelledby={`${active.id}-tab`}>
            {active.content}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillList({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className="about-list-groups">
      {groups.map((group) => (
        <section key={group.title} className="about-list-group">
          <h3>{group.title}</h3>
          <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ))}
    </div>
  );
}
