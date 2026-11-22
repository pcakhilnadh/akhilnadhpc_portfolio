/**
 * Avatar controller: the single seam between the page UI and the 3D avatar.
 *
 * Two kinds of things live here:
 *
 *  1. STATE (who is showing): `supported` (can this device run 3D?),
 *     `active` (has the visitor opened the avatar?) and `ready` (is the 3D
 *     model loaded and on screen?). UI reads it with `useAvatarState()`.
 *
 *  2. COMMANDS (what the avatar should do): `play`, `say`, `hush`. The scene
 *     and the chat UI subscribe; speech-to-text, TTS and lip-sync plug in
 *     later by calling these, without touching the scene graph.
 */

/** Clips baked into the current GLB (see design/avatar). */
export type AvatarClip = "Nod" | "Shake" | "LookAround" | "Blink";

export type AvatarEvent =
  | { type: "play"; clip: AvatarClip }
  | { type: "say"; text: string }
  | { type: "hush" };

export interface AvatarState {
  /** False when WebGL is unavailable or the 3D stage crashed: the avatar can't be opened. */
  supported: boolean;
  /** The visitor opened the avatar (the 3D stage is mounted / loading). */
  active: boolean;
  /** The 3D model has loaded and is showing. Implies `active`. */
  ready: boolean;
}

/* ---------------------------------------------------------------- commands */

type Listener = (event: AvatarEvent) => void;
const listeners = new Set<Listener>();

function emit(event: AvatarEvent) {
  listeners.forEach((l) => {
    // Isolate subscribers: if the 3D scene throws on "play", the chat UI
    // (and any future voice output) must still receive "say".
    try {
      l(event);
    } catch (error) {
      console.error("[avatar] listener failed", error);
    }
  });
}

/* ------------------------------------------------------------------- state */

let state: AvatarState = { supported: true, active: false, ready: false };
const stateListeners = new Set<() => void>();

function setState(patch: Partial<AvatarState>) {
  const next = { ...state, ...patch };
  if (next.supported === state.supported && next.active === state.active && next.ready === state.ready) return;
  state = next; // new object each change, so useSyncExternalStore sees it
  stateListeners.forEach((l) => l());
}

export const avatar = {
  /* commands */
  play(clip: AvatarClip) {
    emit({ type: "play", clip });
  },
  /** Show a message from the avatar. Later: drive TTS + visemes from the same call. */
  say(text: string) {
    emit({ type: "say", text });
  },
  hush() {
    emit({ type: "hush" });
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /* lifecycle */
  /** Visitor asked to meet the avatar: mount (and load) the 3D stage. */
  open() {
    if (state.supported) setState({ active: true });
  },
  /** Back to the static portrait; the 3D stage is unmounted and its GPU memory freed. */
  close() {
    setState({ active: false, ready: false });
    emit({ type: "hush" });
  },
  /** The 3D stage reports it is loaded (called by the avatar layer). */
  setReady(value: boolean) {
    setState({ ready: value && state.active });
  },
  /** Device capability (called once by the avatar layer). */
  setSupported(value: boolean) {
    setState(value ? { supported: true } : { supported: false, active: false, ready: false });
  },
  /** The 3D stage crashed: fall back to the static portrait for good. */
  fail() {
    setState({ supported: false, active: false, ready: false });
    emit({ type: "hush" });
  },

  getState: () => state,
  subscribeState(listener: () => void) {
    stateListeners.add(listener);
    return () => {
      stateListeners.delete(listener);
    };
  },
};
