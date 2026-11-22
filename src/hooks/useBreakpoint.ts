import { useSyncExternalStore } from "react";
import { layoutFor, type Layout } from "../features/avatar/framing";

function subscribe(cb: () => void) {
  window.addEventListener("resize", cb);
  window.addEventListener("orientationchange", cb);
  return () => {
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", cb);
  };
}

/** Current hero layout: "mobile" | "tablet" | "wide". */
export function useLayout(): Layout {
  return useSyncExternalStore(
    subscribe,
    () => layoutFor(window.innerWidth, window.innerHeight),
    () => "wide",
  );
}
