import { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.scss";
import TarnishedButton from "../TarnishedButton/TarnishedButton";

type Props = {
  src: string;
  loop?: boolean;
};

export default function AudioPlayer({ src, loop = true }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
    } else {
      try {
        await a.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio play failed", err);
      }
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.loop = !!loop;
    return () => {
      if (a) a.pause();
    };
  }, [loop]);

  return (
    <>
      <audio ref={audioRef} src={src} />
      <TarnishedButton
        className={styles.control}
        onClick={toggle}
        aria-pressed={isPlaying}
      >
        {isPlaying ? "Pause Music" : "Play Music"}
      </TarnishedButton>
    </>
  );
}
