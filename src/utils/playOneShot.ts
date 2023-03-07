export default function playOneShot(
  src: string,
  volume = 1
): HTMLAudioElement | null {
  try {
    const a = new Audio(src);
    a.volume = volume;
    // Play and don't await — errors handled on the element
    a.play().catch((err) => {
      console.warn("playOneShot: play() failed", err);
    });

    // Remove element reference on end to allow GC
    a.addEventListener("ended", () => {
      // allow garbage collection by removing listeners
      a.src = "";
    });

    return a;
  } catch (err) {
    console.warn("playOneShot failed", err);
    return null;
  }
}
