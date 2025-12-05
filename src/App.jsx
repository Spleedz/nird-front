import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sesame from "./components/Sesame"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sesame />
    </> 
  )
}

export default App
