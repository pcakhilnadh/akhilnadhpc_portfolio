import { MODEL_URL } from "./model";

/** The 3D stage (three.js + scene) is a separate chunk, fetched only when the visitor opens the avatar. */
export const loadStage = () => import("./AvatarStage");

let warmed = false;

/**
 * Start fetching the 3D chunk and the model before the click (call on
 * hover/focus of the "Say hi" button), so opening feels instant.
 */
export function preloadStage() {
  if (warmed) return;
  warmed = true;
  void loadStage();
  void fetch(MODEL_URL).catch(() => {});
}
