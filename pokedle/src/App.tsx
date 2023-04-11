import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home';
import { GameScreen } from './components/GameScreen';
//import './styles.css' 

export function App() {

  return (
    <div>
      <h1>Hello!</h1>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/gen/:gameMode" element={<GameScreen />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

