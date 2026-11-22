/**
 * Builds the ATS-friendly resume PDF in the browser, at click time, from
 * buildResume(). Loaded lazily (import("./pdf")), so jsPDF never touches the
 * landing page's JavaScript.
 *
 * ATS rules followed: one column, real (selectable) text in a standard font,
 * conventional section headings, no images, tables, icons or text in shapes,
 * dates on the same line as the role, and document metadata filled in.
 */
import { jsPDF } from "jspdf";
import { buildResume, type ResumeDoc } from "./model";

// A4 in points
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MX = 48; // side margin
const MY = 46; // top / bottom margin
const W = PAGE_W - 2 * MX;

const INK = "#000000";
const SOFT = "#333333";
const MUTE = "#666666";

/**
 * The PDF's built-in Helvetica only knows Latin-1; anything outside it
 * garbles the whole line (and what an ATS reads). Map the usual suspects to
 * plain equivalents and drop the rest.
 */
function clean(s: string): string {
  return s
    .replace(/[–—−]/g, "-")
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/₹\s*/g, "INR ")
    .replace(/•/g, "-")
    .replace(/…/g, "...")
    .replace(/[   ]/g, " ")
    .replace(/[^\x20-\x7E\xA1-\xFF]/g, "");
}

class Writer {
  doc = new jsPDF({ unit: "pt", format: "a4", compress: true });
  /** Top of the next line */
  y = MY;

  font(style: "normal" | "bold" | "italic", size: number, color = INK) {
    this.doc.setFont("helvetica", style);
    this.doc.setFontSize(size);
    this.doc.setTextColor(color);
  }

  /** Start a new page if `h` points don't fit. */
  ensure(h: number) {
    if (this.y + h > PAGE_H - MY) {
      this.doc.addPage();
      this.y = MY;
    }
  }

  line(text: string, x: number, opts: { align?: "right"; url?: string } = {}) {
    this.doc.text(text, x, this.y, { baseline: "top", align: opts.align });
    if (opts.url) {
      const w = this.doc.getTextWidth(text);
      this.doc.link(opts.align === "right" ? x - w : x, this.y, w, this.doc.getFontSize(), { url: opts.url });
    }
  }

  /** Wrapped paragraph in the current font. */
  para(text: string, leading: number, x = MX, width = W) {
    const lines: string[] = this.doc.splitTextToSize(clean(text), width);
    for (const l of lines) {
      this.ensure(leading);
      this.line(l, x);
      this.y += leading;
    }
  }

  heading(title: string) {
    // keep the heading with at least a few lines of its section
    this.ensure(64);
    this.y += 12;
    this.font("bold", 10.5);
    this.line(title.toUpperCase(), MX);
    this.y += 15;
    this.doc.setDrawColor(INK);
    this.doc.setLineWidth(0.7);
    this.doc.line(MX, this.y, MX + W, this.y);
    this.y += 8;
  }

  /** Bold text on the left, plain text right-aligned on the same line. */
  leftRight(left: string, right: string, size: number) {
    this.font("normal", size - 1, SOFT);
    const rightText = clean(right);
    const rw = this.doc.getTextWidth(rightText);
    this.font("bold", size);
    const lines: string[] = this.doc.splitTextToSize(clean(left), W - rw - 14);
    this.ensure(lines.length * (size + 3) + 30);
    lines.forEach((l, i) => {
      this.line(l, MX);
      if (i === 0) {
        // 1pt smaller font, so nudge it down to share the role's baseline
        // (keeps role and dates on one line for ATS parsers)
        this.font("normal", size - 1, SOFT);
        this.y += 0.75;
        this.line(rightText, MX + W, { align: "right" });
        this.y -= 0.75;
        this.font("bold", size);
      }
      this.y += size + 3;
    });
  }

  bullet(text: string, size: number, leading: number) {
    this.font("normal", size, INK);
    const indent = 12;
    const lines: string[] = this.doc.splitTextToSize(clean(text), W - indent);
    lines.forEach((l, i) => {
      this.ensure(leading);
      if (i === 0) {
        this.doc.setFillColor(INK);
        this.doc.circle(MX + 3.5, this.y + size * 0.45, 1.3, "F");
      }
      this.line(l, MX + indent);
      this.y += leading;
    });
  }

  /** "Label: item, item, ..." with a bold label, wrapped as one paragraph. */
  labelled(label: string, text: string, size: number, leading: number) {
    const words = clean(text).split(" ");
    this.font("bold", size);
    const lab = `${clean(label)}: `;
    const labW = this.doc.getTextWidth(lab);
    this.font("normal", size);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      const room = lines.length === 0 ? W - labW : W;
      if (this.doc.getTextWidth(next) > room && cur) {
        lines.push(cur);
        cur = w;
      } else cur = next;
    }
    if (cur) lines.push(cur);
    this.ensure(leading * Math.min(lines.length, 2));
    lines.forEach((l, i) => {
      this.ensure(leading);
      if (i === 0) {
        this.font("bold", size);
        this.line(lab, MX);
        this.font("normal", size);
        this.line(l, MX + labW);
      } else this.line(l, MX);
      this.y += leading;
    });
  }

  /** Items joined with separators, wrapped across lines; items may be links. */
  inline(items: { text: string; href?: string }[], size: number, leading: number) {
    this.font("normal", size, SOFT);
    const sep = "  |  ";
    const sepW = this.doc.getTextWidth(sep);
    let x = MX;
    items.forEach((it, i) => {
      const t = clean(it.text);
      const w = this.doc.getTextWidth(t);
      if (i > 0) {
        if (x + sepW + w > MX + W) {
          this.y += leading;
          x = MX;
        } else {
          this.line(sep, x);
          x += sepW;
        }
      }
      this.doc.text(t, x, this.y, { baseline: "top" });
      if (it.href) this.doc.link(x, this.y, w, size, { url: it.href });
      x += w;
    });
    this.y += leading;
  }
}

function render(r: ResumeDoc, phone: string | undefined): jsPDF {
  const w = new Writer();
  const { doc } = w;

  // ---- Header ----
  w.font("bold", 22);
  w.line(clean(r.name), MX);
  w.y += 27;
  w.font("normal", 11.5, SOFT);
  w.line(clean(r.headline), MX);
  w.y += 18;
  // Contact: phone, email and city on one row; profile links on the next.
  const [email, ...profiles] = r.links;
  w.inline(
    [...(phone ? [{ text: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` }] : []), email, { text: r.location }],
    9.5,
    14,
  );
  if (profiles.length) w.inline(profiles, 9.5, 14);
  w.y += 4;
  doc.setDrawColor(INK);
  doc.setLineWidth(1.4);
  doc.line(MX, w.y, MX + W, w.y);
  w.y += 4;

  // ---- Summary ----
  w.heading("Summary");
  w.font("normal", 9.5);
  w.para(r.summary, 13);

  // ---- Experience ----
  if (r.experience.length) {
    w.heading(r.totalYears ? `Experience (${r.totalYears} years)` : "Experience");
    r.experience.forEach((j, i) => {
      if (i > 0) w.y += 8;
      w.leftRight(j.role, j.period, 10.5);
      w.font("bold", 9.5, SOFT);
      w.para([j.company, j.location].filter(Boolean).join(", "), 13);
      if (j.context) {
        w.font("italic", 9, MUTE);
        w.para(j.context, 12.5);
      }
      w.y += 2;
      j.bullets.forEach((b) => w.bullet(b, 9.5, 13));
    });
  }

  // ---- Projects ----
  if (r.projects.length) {
    w.heading("Projects");
    r.projects.forEach((p, i) => {
      if (i > 0) w.y += 7;
      w.font("bold", 10);
      w.ensure(40);
      w.para(p.title, 13.5);
      w.font("normal", 9.5);
      w.para(p.text, 13);
    });
  }

  // ---- Skills ----
  if (r.skills.length) {
    w.heading("Skills");
    r.skills.forEach((g, i) => {
      if (i > 0) w.y += 3;
      w.labelled(g.group, g.items.join(", "), 9.5, 13);
    });
  }

  // ---- Education ----
  if (r.education.length) {
    w.heading("Education");
    r.education.forEach((e, i) => {
      if (i > 0) w.y += 6;
      w.leftRight(e.degree, e.period, 10);
      w.font("normal", 9.5, SOFT);
      w.para(e.institution, 13);
    });
  }

  // ---- Achievements ----
  if (r.achievements.length) {
    w.heading("Key Achievements");
    r.achievements.forEach((a) => w.bullet(a, 9.5, 13));
  }

  doc.setProperties({
    title: clean(`${r.name} - Resume`),
    subject: clean(r.headline),
    author: clean(r.name),
    keywords: clean(r.skills.flatMap((g) => g.items).join(", ")),
    creator: clean(`${r.name} portfolio`),
  });
  return doc;
}

/** Build the PDF from the current data and hand it to the browser as a download. */
export function downloadResume(): void {
  const r = buildResume();
  const phone = import.meta.env.VITE_RESUME_PHONE?.trim() || undefined;
  const doc = render(r, phone);
  doc.save(`${r.name.replace(/\s+/g, "_")}_Resume.pdf`);
}
