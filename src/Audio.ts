import StateManager from './StateManager';
import decodeAudioData from './decodeAudioData';
import { getBuffer } from './utils';

export type PropType = {
  file: string;
  volume?: number;
  autoPlay?: boolean;
  loop?: boolean;
};

const Audio = ({
  file,
  volume = 1,
  autoPlay = false,
  loop = false,
}: PropType) => {
  const audioContext = new AudioContext();
  const source = audioContext.createBufferSource();
  const states = StateManager();

  getBuffer(file).then(buffer =>
    decodeAudioData(
      audioContext,
      source,
      buffer,
      volume,
      autoPlay,
      loop,
      states
    )
  );

  return {
    play() {
      if (states.get('isDecoded')) {
        source.start(0);
      }
    },

    stop() {
      source.stop(0);
    },

    setVolume(newVolume: number) {
      const gainNode = audioContext.createGain();
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      gainNode.gain.value = newVolume;
    },
  };
};

export default Audio;
