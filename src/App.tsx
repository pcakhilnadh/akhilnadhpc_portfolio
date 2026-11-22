import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./pages/Home";

/** The app shell: Navbar on top, Footer at the bottom, and the inner app (Home) between them. */
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
      </main>
      <Footer />
    </>
  );
}
