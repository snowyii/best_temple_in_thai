import { RxAvatar } from 'react-icons/rx'

const monkImage = [

    'https://cms.dmpcdn.com/dara/2022/04/17/542d50f0-bde1-11ec-becd-975e07174303_original.jpg',
    'https://i.pinimg.com/originals/2f/62/88/2f62889c503dbd07fe7959442f66d462.jpg',
    'https://news.mthai.com/app/uploads/2017/07/102-500x267.jpg',
    'https://image.posttoday.com/media/content/2019/10/27/40F6FEB7FC9941E49E926760D35197C6.png',
    'https://image.tnews.co.th/uploads/images/contents/w1024/2022/05/XnuuAEKoySIOdiLjvJpr.webp',
    'https://hilight.kapook.com/img_cms2/user/ammod/pray1.jpg',


]

const CurrentPeoplePane = ({ currentPeople }) => {
    return <div className="people-pane" style={{ height: '15vh' }}>

        {
            currentPeople.map((people, index) => {
                return <div style={{ backgroundColor: '#D3D3D3', minWidth: 300, borderRadius: 20, height: 180, alignItems: 'center', display: 'flex', justifyContent: 'center', marginRight: 5, borderColor: 'black' }}>
                    {/* <RxAvatar size={144} key={people} /> */}
                    <img src={monkImage[index % 6]} alt='' style={{ width: 300, height: 200 }} />
                </div>
            })
        }

    </div>
}

export default CurrentPeoplePane