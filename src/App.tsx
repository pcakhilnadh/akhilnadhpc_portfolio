import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Hero } from "./sections/Hero";
import { Contact, Expertise, Ticker, Work, Writing } from "./sections/Sections";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Work />
        <Expertise />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
