import { useState } from "react"
import "./App.css"

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <button onClick={() => setIsLoading(!isLoading)}>Toggle Loading</button>
      {isLoading ? (
        <div className="loading-wrap">
          <img className="loading-image" src="/bao.jpeg" alt="Loading" />
        </div>
      ) : (
        <div>Content loaded!</div>
      )}
    </>
  )
}