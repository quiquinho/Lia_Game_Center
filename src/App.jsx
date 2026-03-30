import React, { useState } from 'react'
import './App.css'
import pictogram1 from './assets/img/pictograms/Gemini_Generated_Image_n65ba9n65ba9n65b.png'
import Couples from './Couples'

function App() {
  const [currentView, setCurrentView] = useState('home')

  if (currentView === 'couples') {
    return (
      <div className="container">
        <Couples onBack={() => setCurrentView('home')} />
      </div>
    )
  }

  return (
    <div className="container">
      <h1 className="title">Rosalia</h1>
      <div className="pictograms-menu">
        <div className="pictogram-box" onClick={() => setCurrentView('couples')}>
          <img src={pictogram1} alt="Juego de Parejas" className="pictogram-img" />
        </div>
      </div>
    </div>
  )
}

export default App
