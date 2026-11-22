import { Section } from "../../components/ui/Section";
import { site } from "../../config/site";
import { profile } from "../../data/profile";
import "./contact.css";

/** Contact: the email call-to-action and every profile link from profile.json. */
export function Contact() {
  // Primary profile first, otherwise keep the order in the JSON.
  const socials = [...(profile.socials ?? [])].sort((a, b) => Number(!!b.primary) - Number(!!a.primary));

  return (
    <Section id="contact" index="07" eyebrow="Contact" title="Let's talk" outline="Say hello">
      <div className="contact">
        <div className="contact__cta">
          <p className="contact__lead">
            Have a problem that needs ML, GenAI or computer vision? Or just want to say hi? My inbox is open.
          </p>
          <a href={`mailto:${site.email}`} className="np np-btn np-btn--primary contact__email">
            {site.email} <span className="arrow" aria-hidden="true">→</span>
          </a>
          <p className="contact__where">
            <span className="np-tag">{site.location}</span>
          </p>
        </div>

        {socials.length > 0 && (
          <ul className="socials" aria-label="Profiles elsewhere">
            {socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer me" className="social">
                  <span className="social__platform">{s.platform}</span>
                  {s.username && !/^\d+$/.test(s.username) && <span className="social__user">@{s.username}</span>}
                  <span className="social__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
