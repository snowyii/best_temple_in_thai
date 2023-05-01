import './App.css';
import { useEffect } from 'react';
import JoinButton from './components/Button';
import VoiceList2 from './components/VoiceList2';

function Monk () {

    return (
        <div className="App-2">
            <div className="mid-div">{"Virtual Temple (ผู้ควบคุม)"}</div>

            {/* <JoinButton /> */}
            <VoiceList2 />

        </div>
    );
}

export default Monk;
