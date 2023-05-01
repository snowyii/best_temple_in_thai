import axios from "axios"
import { useState, useEffect, useRef, createRef, useCallback } from "react"
import Peer from "simple-peer";
import io from 'socket.io-client'
import ReactAudioPlayer from 'react-audio-player';
import { RxAvatar } from 'react-icons/rx'
import ListPrayer from "./ListPrayer";
import CurrentPeoplePane from "./CurrentPeoplePane";
import Button from "./Button";

const WEBSOCKET_URL = 'WEBSOCKET_URL'
const URL = 'URL'


const VoiceList2 = () => {
    const videoRef = useRef(null);

    const [played, setPlayed] = useState(false)
    const [message, setMessage] = useState('')

    const [broadcastText, setBroadCastText] = useState("")
    const [currentPeople, setCurrentPeople] = useState([])
    const [audioList, setAudioList] = useState([])

    const [soundList, setSoundList] = useState([1, 2])
    const socket = useRef(null)

    const [userAudioRef, setUserAudioRef] = useState([])

    const [selectedVoice, setSelectedVoice] = useState("")



    useEffect(() => {
        // add or remove refs
        setUserAudioRef((elRefs) =>
            Array(audioList.length)
                .fill()
                .map((_, i) => createRef()),
        );
    }, [audioList]);


    const handleClick = useCallback(() => {

        for (let ref of userAudioRef) {

            if (ref.current) {
                ref.current.play()
            }

        }
    }, [userAudioRef])


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: URL

                })

                setSoundList(res.data)
            } catch (err) {
            }

        }

        fetchData()

    }, [])




    useEffect(() => {
        socket.current = new WebSocket(WEBSOCKET_URL);

        socket.current.addEventListener("open", () => {
            socket.current.send(`{"action" : "default" , "type": "getUser"}`);
        });



        socket.current.addEventListener("message", (event) => {
            const data = JSON.parse(event.data)

            if (data.status === 'join') {
                setCurrentPeople(data.persons)
            } else if (data.status == 'texter') {
                setMessage(data.message)
            } else if (data.status == 'start') {
                handleClick()
            } else if (data.status == 'add-voice') {
                if (!audioList.includes(data.message)) {
                    setAudioList((audioList) => [...audioList, data.message])
                }

            } else if (data.status == 'end-pray') {
                setAudioList([])
            }



        });

        const handleBeforeUnload = () => {
            socket.current.close()
        }
        window.addEventListener('beforeunload', handleBeforeUnload);


        return () => {
            socket.current.close()
            window.removeEventListener('beforeunload', handleBeforeUnload);

        }
    }, [userAudioRef])



    const sendStart = () => {
        socket.current.send(`{"action" : "default" , "type" : "start" }`)
        setPlayed(true)
    }

    const sendVoice = (name) => {
        socket.current.send(`{"action" : "default" , "type" : "add-voice" , "message" : "${name}" }`)
    }


    const endPray = () => {
        socket.current.send(`{"action" : "default" , "type" : "end-pray" }`)
        setPlayed(false)
    }



    const handleKeyPress = (e) => {
        if (e.key == 'Enter' && broadcastText != '') {
            socket.current.send(`{"action" : "default" , "type" : "texter" , "message" : "${broadcastText}"}`)
            setBroadCastText("")
        }
    }

    return <div className="main-pane" style={{}}>
        <div className="broadcast">



            <div className="p1-container">
                <img src="https://cdn.pixabay.com/photo/2014/04/03/10/25/megaphone-310394_1280.png" style={{ width: 60, height: 60, marginRight: 30 }} />

                <h1 className='big-p1'> ประกาศ: <span style={{ fontSize: 30 }}>{message}</span></h1>
            </div>
            <input value={broadcastText} onChange={e => setBroadCastText(e.target.value)} style={{ width: 800, height: 50, marginTop: 5, paddingLeft: 10, fontSize: 30, borderRadius: 10 }} placeholder="ประกาศแก่ผู้ร่วมสวดมนต์"
                onKeyDown={(e) => handleKeyPress(e)}
            />
        </div>



        <div style={{ position: 'fixed', top: '40%', left: '40%', right: '40%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8e8d3', minWidth: 600, 'borderRadius': 30 }}>
            <p1 style={{ color: 'black', minWidth: 500, fontSize: 50 }}>มีบทสวดแบ่งปันแล้ว {audioList.length} บทสวด</p1>
            {!played ? <p2 style={{ fontSize: 40 }}>*กรุณารอผุ้ควบคุมเริ่มการสวดมนต์</p2> : <p2 style={{ fontSize: 40 }}>สวดมนต์...</p2>}
            <div>

                <Button text={'เริ่มสวดมนต์'} onClick={sendStart} type={1} can={audioList.length > 0 && played == false} />
                <Button text={'จบการสวดมนต์'} onClick={endPray} type={2} can={played} />
            </div>

        </div>

        {!played && <ListPrayer listOfPrayers={soundList} onClick={(item) => {

            setSelectedVoice(item)
        }}

            selectedVoice={selectedVoice}
            onClickButton={() => {
                sendVoice(selectedVoice)
                alert('คุณได้แบ่งปันเสียงนี้กับผู้ร่วมห้องทุกท่าน')
            }}

        />}



        <div className="how_many">
            <h1>ขณะนี้มีผู้ร่วมสวดมนต์ {currentPeople.length} ท่าน
            </h1>
        </div>
        <div className="voice-list" onClick={handleClick}>
            {
                audioList.map((url, index) => {
                    return <audio src={url} ref={userAudioRef[index]} />
                })
            }
        </div>


        <CurrentPeoplePane currentPeople={currentPeople} />

    </div >
}

export default VoiceList2