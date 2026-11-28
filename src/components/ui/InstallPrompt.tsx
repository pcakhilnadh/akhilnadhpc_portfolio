import { useState } from "react";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import "./installPrompt.css";

const DISMISS_KEY = "install-prompt-dismissed";

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * A small dismissible popup offering to install the site as an app. Only shows
 * when the browser fires `beforeinstallprompt`; closing it hides it for the
 * rest of the browser session.
 */
export function InstallPrompt() {
  const { canInstall, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(wasDismissed);

  if (!canInstall || dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* storage blocked: it just stays closed until reload */
    }
  };

  return (
    <aside className="install-toast np" role="dialog" aria-labelledby="install-toast-title">
      <button type="button" className="install-toast__close" aria-label="Dismiss" onClick={dismiss}>
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
