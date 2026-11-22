import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./features/about/About";
import { Certificates } from "./features/certificates/Certificates";
import { Contact } from "./features/contact/Contact";
import { Experience } from "./features/experience/Experience";
import { Projects } from "./features/projects/Projects";
import { Skills } from "./features/skills/Skills";
import { Home } from "./pages/Home";

/**
 * The app shell: Navbar on top, Footer at the bottom, and between them the
 * landing screen (Home) followed by the content sections. Section ids are the
 * navbar's targets (config/site.ts).
 */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          // Move focus without adding "#main" to the address bar.
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Home />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
