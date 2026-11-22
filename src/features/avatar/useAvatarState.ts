import { useSyncExternalStore } from "react";
import { avatar, type AvatarState } from "./controller";

/** Live avatar state: `{ supported, active, ready }`. See controller.ts. */
export function useAvatarState(): AvatarState {
  return useSyncExternalStore(avatar.subscribeState, avatar.getState, avatar.getState);
}
