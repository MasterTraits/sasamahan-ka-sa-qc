import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './routes/home'
import Generate from './components/features/generate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Generate/>
    </>
  )
}

export default App
