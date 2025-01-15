import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './routes/home'
import Generate from '@/components/test/generate'
import History from './components/features/history'
import Visuals from './components/test/visuals'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Visuals/>
    </>
  )
}

export default App
