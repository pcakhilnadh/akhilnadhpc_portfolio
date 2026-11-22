import type { ReactNode } from "react";
import "./timeline.css";

export interface TimelineItem {
  key: string;
  /** Sortable date ("YYYY-MM-DD", or a year as "YYYY"). Latest comes first. */
  sortDate: string;
  /** Shown above the title, e.g. "Oct 2024 – Present" */
  period: string;
  /** Extra mono detail next to the period, e.g. a duration */
  periodNote?: string;
  title: string;
  /** Organisation line under the title */
  org: string;
  orgUrl?: string;
  /** Location, grade… shown after the org */
  meta?: string;
  /** Marks the ongoing entry (filled node + "Now" tag) */
  current?: boolean;
  children?: ReactNode;
}

/**
 * A vertical timeline, newest entry first. Shared by Experience and Education:
 * they only map their data into TimelineItems.
 */
export function Timeline({ items, label }: { items: TimelineItem[]; label: string }) {
  const sorted = [...items].sort((a, b) => (a.sortDate < b.sortDate ? 1 : a.sortDate > b.sortDate ? -1 : 0));
  return (
    <ol className="tl" aria-label={label}>
      {sorted.map((item) => (
        <li key={item.key} className="tl__item" data-current={item.current || undefined}>
          <span className="tl__node" aria-hidden="true" />
          <p className="tl__period">
            {item.period}
            {item.periodNote && <span className="tl__note">{item.periodNote}</span>}
            {item.current && <span className="np-tag np-tag--solid tl__now">Now</span>}
          </p>
          <div className="tl__body">
            <h3 className="tl__title">{item.title}</h3>
            <p className="tl__org">
              {item.orgUrl ? (
                <a className="text-link" href={item.orgUrl} target="_blank" rel="noopener noreferrer">
                  {item.org}
                </a>
              ) : (
                item.org
              )}
              {item.meta && <span className="tl__meta">{item.meta}</span>}
            </p>
            {item.children && <div className="tl__extra">{item.children}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
