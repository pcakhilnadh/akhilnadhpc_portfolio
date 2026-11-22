import { Section } from "../../components/ui/Section";
import { AboutDetails } from "./AboutDetails";
import { Education } from "./Education";
import "./about.css";

/** About: the long bio and quick facts, with Education folded in below. */
export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="About" outline="The long version">
      <AboutDetails />
      <Education />
    </Section>
  );
}
