/**
 * Avatar controller — a tiny event bus between the page UI and the 3D avatar.
 *
 * UI code (buttons, future voice chat, blog reader) calls `avatar.*`;
 * the scene subscribes and turns commands into animation. Keeping this
 * boundary means speech-to-text, TTS and lip-sync can plug in later
 * without touching the scene graph.
 */

/** Clips baked into the current GLB (see design/avatar). */
export type AvatarClip = "Nod" | "Shake" | "LookAround" | "Blink";

export type AvatarEvent =
  | { type: "play"; clip: AvatarClip }
  | { type: "say"; text: string; durationMs: number }
  | { type: "hush" };

type Listener = (event: AvatarEvent) => void;
const listeners = new Set<Listener>();

function emit(event: AvatarEvent) {
  listeners.forEach((l) => l(event));
}

export const avatar = {
  play(clip: AvatarClip) {
    emit({ type: "play", clip });
  },
  /** Show a speech bubble. Later: drive TTS + visemes from the same call. */
  say(text: string, durationMs = 4200) {
    emit({ type: "say", text, durationMs });
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
};
