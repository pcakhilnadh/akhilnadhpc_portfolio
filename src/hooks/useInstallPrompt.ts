import { useCallback, useSyncExternalStore } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface Window {
    /** Set by the inline script in index.html if the event fired before this code loaded. */
    __installEvent?: BeforeInstallPromptEvent | null;
  }
}

/*
 * Chrome can fire `beforeinstallprompt` very early, even before the app's
 * scripts run (it often does on a refresh). An inline script in index.html
 * catches it first; this module picks that up, then keeps listening itself.
 *
 * preventDefault() hides Chrome's own mini-infobar; the site shows its own
 * popup instead (components/ui/InstallPrompt.tsx). Chrome logs "Banner not
 * shown: beforeinstallpromptevent.preventDefault() called" for this: expected.
 */
let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

if (typeof window !== "undefined") {
  deferred = window.__installEvent ?? null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const getSnapshot = () => deferred;

/** Exposes the PWA install prompt when the browser offers one (Chromium/Android/desktop). */
export function useInstallPrompt() {
  const event = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const install = useCallback(async () => {
    if (!deferred) return;
    const e = deferred;
    await e.prompt();
    const { outcome } = await e.userChoice;
    // An event can only be prompted once. Chrome fires a new one later if the
    // visitor said no; after "accepted", `appinstalled` follows.
    if (deferred === e) {
      deferred = null;
      notify();
    }
    return outcome;
  }, []);

  return { canInstall: event !== null, install };
}
