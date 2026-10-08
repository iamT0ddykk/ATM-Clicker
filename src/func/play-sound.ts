import { Howl } from "howler";
export function playSound(sd: string) {
  const sound = new Howl({
    src: [sd],
    autoplay: false,
    volume: 0.8,
  });
  sound.play();
}
