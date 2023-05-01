const ListPrayer = ({ listOfPrayers, onClick, selectedVoice, onClickButton }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', position: 'absolute', left: 0, top: '23%' }}>
            <div className="list-prayer">
                <div style={{ fontSize: 24, borderWidth: 1, borderColor: 'black' }}>เลือกเสียงบทสวดมนต์ที่ท่านชื่นชอบ</div>
                {
                    listOfPrayers.map((item, index) => {
                        return <div className="prayer" key={item} onClick={() => onClick(item)} style={{ backgroundColor: selectedVoice == item ? '#72bf6a' : 'white' }}>
                            <p>{item}</p>
                        </div>
                    })
                }
            </div>
            <button className="confirm-button" onClick={onClickButton}>แบ่งปันเสียงนี้กับเพื่อนของคุณ</button>
        </div>
    )
}

export default ListPrayer