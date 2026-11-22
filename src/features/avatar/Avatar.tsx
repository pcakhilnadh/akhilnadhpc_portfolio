import { useEffect } from "react";
import { Avatar2D } from "./Avatar2D";
import { Avatar3D, type Avatar3DProps } from "./Avatar3D";
import { avatar } from "./controller";
import { useAvatarState } from "./useAvatarState";
import "./avatar.css";

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The avatar area: hosts <Avatar2D /> and <Avatar3D /> in the same spot and
 * crossfades between them as the avatar is opened and closed
 * (see controller.ts for the state they follow).
 */
export function Avatar(props: Avatar3DProps) {
  const { active, ready } = useAvatarState();

  // Devices without WebGL keep the 2D portrait and are never offered the 3D avatar.
  useEffect(() => {
    if (!hasWebGL()) avatar.setSupported(false);
  }, []);

  return (
    <div className="avatar-layer" data-ready={active && ready}>
      <Avatar2D hidden={active && ready} />
      <Avatar3D {...props} />
    </div>
  );
}
