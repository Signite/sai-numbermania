import { useState } from 'react';


import './App.css';
import PlayForm from './components/PlayForm/playForm';
import ConfigureForm from './components/ConfigureForm/ConfigureForm';
import EasyPlayForm from './components/EasyPlayForm/easyPlayForm';

const MODES = {
  MENU: 'menu',
  CONFIGURE: 'configure',
  PLAY: 'play'
};

function App() {
  const [mode, setMode] = useState(MODES.MENU);
  const [optinos, setOptions] = useState({
    maxNumber: 5,
    enablePlus: true,
    enableMinus: true,
    easy: true,
    progressiveDiаficulty: false
  });

  return (
    <div className='app'>
      <h1>Цифромания</h1>
      {mode && mode === MODES.MENU ?
        <div className='col-elements'>
          <button onClick={() => setMode(MODES.PLAY)}>Играть</button>
          <button onClick={() => setMode(MODES.CONFIGURE)}>Настройки</button>
        </div>
        :
        mode === MODES.CONFIGURE
          ? <ConfigureForm options={optinos} setOptions={setOptions} back={() => setMode(MODES.MENU)} />
          : optinos.easy
            ? <EasyPlayForm back={() => setMode(MODES.MENU)} options={optinos} />
            : <PlayForm back={() => setMode(MODES.MENU)} options={optinos} />
      }

    </div>
  )
}

export default App
