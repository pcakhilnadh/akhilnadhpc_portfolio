import { profile } from "../../data/profile";
import { monthsBetween } from "../../lib/dates";

/** The long bio (profile.about, blank lines = paragraphs), quick facts and interests. */
export function AboutDetails() {
  const paragraphs = (profile.about ?? profile.summary).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const years = profile.careerStart ? Math.floor(monthsBetween(profile.careerStart) / 12) : null;
  const { city, state, country } = profile.location;

  return (
    <div className="about">
      <div className="about__bio">
        {paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "about__lead" : undefined}>
            {p}
          </p>
        ))}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="about__awards">
            <p className="kv__label">Recognition</p>
            <ul>
              {profile.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <aside className="about__facts np card" aria-label="Quick facts">
        <dl>
          <div className="kv">
            <dt>Currently</dt>
            <dd>{profile.title}</dd>
          </div>
          {years !== null && (
            <div className="kv">
              <dt>Experience</dt>
              <dd>{years}+ years</dd>
            </div>
          )}
          <div className="kv">
            <dt>Based in</dt>
            <dd>{[city, state, country].filter(Boolean).join(", ")}</dd>
          </div>
          {profile.hometown && (
            <div className="kv">
              <dt>Hometown</dt>
              <dd>{profile.hometown}</dd>
            </div>
          )}
          <div className="kv">
            <dt>Email</dt>
            <dd>
              <a className="text-link" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </dd>
          </div>
        </dl>
        {profile.interests && profile.interests.length > 0 && (
          <div className="about__interests">
            <p className="kv__label">Off the clock</p>
            <ul className="tag-list">
              {profile.interests.map((it) => (
                <li key={it.name} className="np-tag">
                  {it.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
