"use client";

import { contact } from "@/content/site";
import { LinkedIn, WhatsApp } from "./Icons";
import { PopButton } from "./ui/pop-button";
import { CrowdCanvas } from "./ui/skiper-ui/skiper39";
import { useLocale } from "./LocaleProvider";

export function Hero() {
  const { content } = useLocale();
  const { ui } = content;
  const linkedin = contact.linkedin || "#contact";
  const whatsapp = `https://wa.me/${contact.whatsapp}`;
  return (
    <section className="hero hero-crowd" aria-labelledby="hero-title">
      <div className="hero-main hero-centered shell">
        <p className="role-line"><span>{content.profile.role}</span><span>{content.profile.positioning}</span></p>
        <h1 id="hero-title">
          <span>{ui.heroTitleMain}</span>
          <em>{ui.heroTitleAccent}</em>
        </h1>
        <div className="hero-actions">
          <PopButton href={linkedin} {...(contact.linkedin ? { target: "_blank", rel: "noreferrer" } : {})}>
            {ui.heroLinkedIn} <LinkedIn />
          </PopButton>
          <PopButton className="hero-whatsapp-button" href={whatsapp} target="_blank" rel="noreferrer">
            {ui.heroWhatsApp} <WhatsApp />
          </PopButton>
        </div>
      </div>
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} className="hero-crowd-canvas" thoughtPrompts={ui.heroThoughts} />
    </section>
  );
}
