import './App.css';
import { useEffect } from 'react';
import JoinButton from './components/Button';
import VoiceList from './components/VoiceList';

function App () {

  return (
    <div className="App">
      <div className="mid-div">Virtual Temple (ผู้ร่วมสวดมนต์)</div>

      {/* <JoinButton /> */}
      <VoiceList />

    </div>
  );
}

export default App;
