const decodeAudioData = (
  audioContext: AudioContext,
  source: AudioBufferSourceNode,
  buffer: ArrayBuffer,
  volume: number,
  autoPlay: boolean,
  loop: boolean
) => {
  const onSuccess = (data: any) => {
    source.buffer = data;
    source.connect(audioContext.destination);
    source.loop = loop;

    if (autoPlay) {
      const gainNode = audioContext.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioContext.destination);

      source.start(0);
    }
  };

  audioContext.decodeAudioData(buffer, onSuccess, console.error);
};

export default decodeAudioData;
