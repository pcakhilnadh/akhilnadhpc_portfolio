import "./avatar-2d.css";

/**
 * Avatar2D: the avatar's resting state, the illustrated portrait. Shown until
 * the visitor opens the 3D avatar, shown again when they close it, and kept
 * as the permanent fallback on devices without WebGL.
 *
 * It is positioned from the page's `--hx / --hy / --hr` variables so it sits
 * exactly where the 3D head appears, which makes the swap seamless.
 */
export function Avatar2D({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="avatar-2d" aria-hidden={hidden || undefined}>
      <img
        src="/images/avatar-poster.webp"
        alt="Illustrated portrait of Akhil Nadh in a wide-brimmed hat and turtleneck"
        width={720}
        height={964}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
