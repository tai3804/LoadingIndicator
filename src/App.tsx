import { useEffect, useRef, useState } from "react"
import "./App.css"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (isLoading) {
      void audio.play().catch(() => {
        // Browsers may still block playback in some cases.
      })
      return
    }

    audio.pause()
    audio.currentTime = 0
  }, [isLoading])

  return (
    <>
      <audio ref={audioRef} src="/audio.MP3" loop preload="auto" hidden />
      <button onClick={() => setIsLoading(!isLoading)}>Toggle Loading</button>
      {isLoading ? (
        <div className="loading-wrap">
          <img 
            style={{borderRadius: "50%"}}
            className="loading-image" 
            src="/bao.jpeg" alt="Loading" 
          />
        </div>
      ) : (
        <div>Content loaded!</div>
      )}
    </>
  )
}