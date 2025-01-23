import { useState } from 'react'

import './App.css'
import { Button } from 'antd';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button type="primary">Button</Button>
      </div>
    </>
  )
}

export default App
