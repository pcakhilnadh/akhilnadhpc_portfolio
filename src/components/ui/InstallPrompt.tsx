import { useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import "./installPrompt.css";

/**
 * A small popup offering to install the site as an app. Shows on every page
 * load (refresh included) whenever the browser says the site can be installed,
 * i.e. until it is. × hides it for this page view only.
 */
export function InstallPrompt() {
  const { canInstall, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || dismissed) return null;

  return (
    <aside className="install-toast np" role="dialog" aria-labelledby="install-toast-title">
      <button type="button" className="install-toast__close" aria-label="Dismiss" onClick={() => setDismissed(true)}>
        <span aria-hidden="true">×</span>
      </button>
      <p className="install-toast__eyebrow">PWA</p>
      <p id="install-toast-title" className="install-toast__title">
        Install as an app
      </p>
      <p className="install-toast__text">Add it to your home screen. Opens fast, works offline.</p>
      <button type="button" className="np np-btn np-btn--primary np-btn--sm install-toast__cta" onClick={install}>
        Install <span className="arrow" aria-hidden="true">→</span>
      </button>
    </aside>
  );
}
