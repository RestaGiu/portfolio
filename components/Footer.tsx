"use client";

import { contact } from "@/content/site";
import { ArrowUpRight, LinkedIn, WhatsApp } from "./Icons";
import { useLocale } from "./LocaleProvider";

export function Footer() {
  const { content } = useLocale();
  const { ui, profile } = content;
  const linkedin = contact.linkedin || "#contact";
  const whatsapp = `https://wa.me/${contact.whatsapp}`;

  return (
    <footer id="contact" className="footer shell">
      <div className="footer-lead">
        <p className="footer-prompt">{ui.footerPrompt}</p>
        <p className="footer-note">{ui.footerNote}</p>
      </div>
      <div className="footer-actions">
        <a className="footer-action footer-linkedin" href={linkedin} {...(contact.linkedin ? { target: "_blank", rel: "noreferrer" } : {})}>
          <span><LinkedIn size={20} />{ui.heroLinkedIn}</span><ArrowUpRight />
        </a>
        <a className="footer-action footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
          <span><WhatsApp size={20} />{ui.heroWhatsApp}</span><ArrowUpRight />
        </a>
      </div>
      <div className="footer-meta"><p>Resta Giuliano<br/>{profile.role}</p><p>{ui.italianCitizen}<br/>{ui.euWorkAuthorization}</p><p>© {new Date().getFullYear()}</p></div>
    </footer>
  );
}
