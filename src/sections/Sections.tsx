import { blogs, certifications, projects, skills, socialProfiles, workExperience } from "../data";
import { site, socialLinks, yearsOfExperience } from "../config/site";

/* ---------------------------------------------------------- Ticker */

export function Ticker() {
  const items = skills.filter((s) => s.rating >= 4).map((s) => s.name);
  const row = (hidden: boolean) => (
    <ul className="ticker__row" aria-hidden={hidden || undefined}>
      {items.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
  return (
    <div className="ticker" role="region" aria-label="Core tools">
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Work */

const year = (d?: string) => (d ? new Date(d).getFullYear() : "Now");
const companyName = (id?: string) => workExperience.find((w) => w._id === id)?.company_name ?? id ?? "";

export function Work() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">01 — Selected work</p>
          <h2 id="work-title" className="display section__title">
            Shipped, measured,
            <br />
            in production.
          </h2>
        </header>

        <div className="work-list">
          {projects.map((p, i) => (
            <article key={p._id} className="np work-card">
              <div className="work-card__main">
                <div className="work-card__meta">
                  <span className="work-card__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="np-tag">{companyName(p.company)}</span>
                  <span className="np-tag">
                    {year(p.start_date)}–{year(p.end_date)}
                  </span>
                  <span className="np-tag">{p.role}</span>
                </div>
                <h3 className="work-card__title">{p.title}</h3>
                <p className="work-card__desc">{p.short_description}</p>
                {p.domain && (
                  <ul className="chip-list" aria-label="Domains">
                    {p.domain.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
              {p.highlights && (
                <dl className="metrics">
                  {p.highlights.map((h) => (
                    <div key={h.label} className="metric">
                      <dt>{h.label}</dt>
                      <dd>{h.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </article>
          ))}
          <div className="work-more">
            <span className="np-tag">In the pipeline</span>
            <p>
              Case studies on LLM-powered passport &amp; visa verification, passenger queue analytics and facial
              recognition are being written up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Expertise */

const pillars = [
  {
    title: "Computer Vision",
    body: "Detection, tracking and recognition systems that run on live video, from the edge to the cloud.",
    points: ["Object detection & tracking", "Facial recognition", "Depth & volumetric estimation", "Edge AI on Jetson"],
  },
  {
    title: "LLMs & GenAI",
    body: "Language and vision-language models applied to document-heavy operational workflows.",
    points: ["Document & ID verification", "LoRA fine-tuning (LLaMA)", "Invoice reconciliation", "Finance chatbot"],
  },
  {
    title: "Production ML",
    body: "Turning prototypes into reliable services: pipelines, deployment, monitoring and iteration.",
    points: ["FastAPI model services", "Docker & MLflow", "Azure pipelines", "Model optimisation"],
  },
];

export function Expertise() {
  const stats = [
    { value: `${yearsOfExperience()}+`, label: "Years building ML" },
    { value: "3", label: "Industries: aviation, automotive, industrial" },
    { value: String(certifications.length), label: "Certifications" },
    { value: `${skills.length}`, label: "Tools in the kit" },
  ];
  return (
    <section id="expertise" className="section section--light" aria-labelledby="expertise-title">
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">02 — Expertise</p>
          <h2 id="expertise-title" className="display section__title">
            Applied AI,
            <br />
            end to end.
          </h2>
        </header>

        <div className="pillars">
          {pillars.map((p, i) => (
            <article key={p.title} className="np np--on-light pillar">
              <span className="pillar__num">0{i + 1}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__body">{p.body}</p>
              <ul className="pillar__points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd className="display">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Writing */

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function Writing() {
  const medium = socialProfiles.find((s) => s.platform === "Medium")?.profile_url;
  const latest = [...blogs].sort((a, b) => b.created_date.localeCompare(a.created_date)).slice(0, 3);
  return (
    <section id="writing" className="section" aria-labelledby="writing-title">
      <div className="container">
        <header className="section__head section__head--split">
          <div>
            <p className="eyebrow">03 — Writing</p>
            <h2 id="writing-title" className="display section__title">
              Notes from
              <br />
              the field.
            </h2>
          </div>
          {medium && (
            <a href={medium} target="_blank" rel="noopener noreferrer" className="np np-btn np-btn--ghost">
              More on Medium <span className="arrow">↗</span>
            </a>
          )}
        </header>

        <ul className="posts">
          {latest.map((b) => (
            <li key={b.id} className="np post">
              <div className="post__meta">
                <time dateTime={b.created_date}>{fmtDate(b.created_date)}</time>
                {b.read_time && <span>{b.read_time} min read</span>}
              </div>
              <h3 className="post__title">{b.title}</h3>
              {b.excerpt && <p className="post__excerpt">{b.excerpt}</p>}
              <ul className="chip-list">
                {b.tags.map((t) => (
                  <li key={t}>{t === "InterviewEx" ? "Interviews" : t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Contact */

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="np contact__card">
          <p className="eyebrow">04 — Contact</p>
          <h2 id="contact-title" className="display contact__title">
            Let&apos;s build something intelligent.
          </h2>
          <p className="contact__body">
            Open to conversations about computer vision, LLM systems and taking ML from prototype to production.
          </p>
          <div className="contact__actions">
            <a href={`mailto:${site.email}`} className="np np-btn np-btn--primary">
              {site.email} <span className="arrow">→</span>
            </a>
            {socialLinks
              .filter((s) => s.label !== "Medium")
              .map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="np np-btn np-btn--ghost">
                  {s.label} <span className="arrow">↗</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
