import { useMemo, useState } from 'react'

export function useSpeechCoach(text: string) {
  const [speaking, setSpeaking] = useState(false)

  const supported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    [],
  )

  const speak = () => {
    if (!supported) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.92
    utterance.pitch = 1
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  return {
    speaking,
    supported,
    speak,
  }
}
