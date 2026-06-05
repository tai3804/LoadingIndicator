import { useEffect, useRef, useState } from "react"
import "./App.css"

const loadingIndicators = [
  { name: "Bao", src: "/bao.jpeg" },
  { name: "Giang", src: "/giang.jpeg" },
  { name: "Hiep", src: "/hiep.jpeg" },
  { name: "Huy", src: "/huy.jpeg" },
  { name: "Nhi", src: "/nhi.jpeg" },
  { name: "Truong", src: "/truong.jpeg" },
  { name: "Tuan", src: "/tuan.jpeg" },
  { name: "Tue", src: "/tue.jpeg" },
] as const

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndicator, setSelectedIndicator] = useState(loadingIndicators[0])
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
      <main className="app-shell">
        <button className="toggle-button" onClick={() => setIsLoading(!isLoading)}>
          {isLoading ? "Tắt loading" : "Bật loading"}
        </button>
        <section className="content-grid">
          <div className="selection-panel">
            <div className="panel-header">
              <h2>Chọn loading indicator</h2>
              <span>{loadingIndicators.length} ảnh</span>
            </div>

            <div className="indicator-grid">
              {loadingIndicators.map((indicator) => (
                <button
                  key={indicator.src}
                  type="button"
                  className={`indicator-card ${selectedIndicator.src === indicator.src ? "active" : ""}`}
                  onClick={() => setSelectedIndicator(indicator)}
                >
                  <img className="indicator-thumb" src={indicator.src} alt={indicator.name} />
                  <span>{indicator.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="preview-panel">
            <div className="panel-header">
              <h2>Xem trước</h2>
              <span>{selectedIndicator.name}</span>
            </div>

            {isLoading ? (
              <div className="loading-wrap">
                <img className="loading-image" src={selectedIndicator.src} alt="Loading" />
                <p>Đang loading với {selectedIndicator.name}</p>
              </div>
            ) : (
              <div className="idle-state">
                <p>Content loaded!</p>
                <span>Bật loading để xem ảnh đã chọn.</span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}