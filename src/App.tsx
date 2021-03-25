import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [text, setText] = useState<string>('')
  const [names, setNames] = useState<string[]>([])

  const addName = () => {
    if (text !== '') {
      setNames([...names, text])
      setText('')
    }
  }

  return (
    <>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => addName()}>Add</button>
      <ul>
        {names.map((name: string, index: number) =>
          <li key={index}>{name}</li>)
        }
      </ul>
    </>
  )
}

export default App;
