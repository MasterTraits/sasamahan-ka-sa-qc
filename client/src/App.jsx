import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './routes/home'
import Generate from '@/components/test/generate'
import History from './components/features/history'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <History/>
    </>
  )
}

export default App
