import type { ReactNode } from "react";
import "./section.css";

interface SectionProps {
  id: string;
  /** Two-digit index shown in the eyebrow, e.g. "01" */
  index: string;
  /** Small mono label above the heading */
  eyebrow: string;
  /** The heading, solid ink */
  title: string;
  /** An optional second line, drawn as an outline */
  outline?: string;
  children: ReactNode;
}

/**
 * The shell every content section shares: an anchor id for the navbar, the
 * eyebrow + display heading, and a container. Sections only supply content.
 */
export function Section({ id, index, eyebrow, title, outline, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <div className="container">
        <header className="section__head">
          <p className="eyebrow">
            <span className="section__index">{index}</span> {eyebrow}
          </p>
          <h2 id={headingId} className="section__title display">
            {title}
            {outline && <span className="section__outline">{outline}</span>}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
