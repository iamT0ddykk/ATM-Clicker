import { Howl } from "howler";
export function playSound() {
  const sound = new Howl({
    src: ["money.mp3"],
    autoplay: false,
    volume: 0.8,
  });
  sound.play();
}
