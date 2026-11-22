import { useEffect, useRef, useState } from "react";
import { site } from "../../../config/site";
import { avatar } from "../controller";
import { preloadStage } from "../stageLoader";
import { useAvatarState } from "../useAvatarState";
import "./chat.css";

/**
 * AvatarChat: everything the visitor uses to meet and talk to the avatar.
 *
 * FLOW TODAY
 *   1. Resting: the static portrait + a "Say hi to my avatar" button.
 *   2. Click: the 3D avatar loads (button shows "Loading…").
 *   3. Loaded: the avatar nods and shows ONE message with an ✕.
 *   4. ✕ (or Esc): back to the static portrait and the button.
 *
 * PLANNED: speech-to-text → AI reply → text-to-speech with lip-sync, and
 * reading blog posts aloud. All of that belongs in this folder: replace the
 * single greeting (profile.json > avatarGreeting) with the real pipeline, and
 * the message bubble with a mic / transcript UI. The page only mounts
 * <AvatarChat />, and the avatar is driven purely through `avatar.*` (see
 * ../controller.ts), so nothing else has to change.
 */
export function AvatarChat() {
  const { supported, active, ready } = useAvatarState();
  const [message, setMessage] = useState<string | null>(null);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const wasActive = useRef(false);

  // The avatar's words arrive as events (today only the greeting below).
  useEffect(
    () =>
      avatar.subscribe((event) => {
        if (event.type === "say") setMessage(event.text);
        if (event.type === "hush") setMessage(null);
      }),
    [],
  );

  // Once the 3D avatar is on screen: nod and say hello.
  useEffect(() => {
    if (!ready) return;
    avatar.say(site.avatarGreeting);
    avatar.play("Nod");
  }, [ready]);

  // Keyboard: send focus to the ✕ when the message appears; Esc closes.
  const showMessage = active && ready && message !== null;
  useEffect(() => {
    if (showMessage) closeBtn.current?.focus({ preventScroll: true });
  }, [showMessage]);
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && avatar.close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // After closing, hand focus back to the "Say hi" button.
  useEffect(() => {
    if (wasActive.current && !active) openBtn.current?.focus({ preventScroll: true });
    wasActive.current = active;
  }, [active]);

  // No WebGL, or the 3D stage crashed: the static portrait stays and there is nothing to open.
  if (!supported) return null;

  return (
    <div className="chat-layer">
      {showMessage && (
        <div className="bubble-anchor">
          <div className="bubble" role="status">
            <p>{message}</p>
            <button ref={closeBtn} type="button" className="bubble__close" aria-label="Close message" onClick={avatar.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      )}

      {!active || !ready ? (
        <div className="chat-dock">
          <div className="container">
            <button
              ref={openBtn}
              type="button"
              className="np np-btn np-btn--ghost np-btn--sm chat-btn"
              disabled={active}
              aria-busy={active || undefined}
              onClick={avatar.open}
              onPointerEnter={preloadStage}
              onFocus={preloadStage}
            >
              {active ? (
                <span>Loading…</span>
              ) : (
                <span>
                  Say hi<span className="chat-btn__long"> to my avatar</span>
                </span>
              )}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
