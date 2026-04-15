let audio = null
let isPlaying = false

export const initAudio = () => {
  if (!audio) {
    audio = new Audio('/audio/dayak.mp3')
    audio.loop = true
    audio.volume = 0.3
  }
}

export const toggleAudio = () => {
  if (!audio) return isPlaying

  if (isPlaying) {
    audio.pause()
  } else {
    // 🔥 RESET KE AWAL SETIAP PLAY
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  isPlaying = !isPlaying
  return isPlaying
}

export const getAudioState = () => isPlaying