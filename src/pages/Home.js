import {React,useState} from 'react'
import {v4 as uuid4v} from 'uuid'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const nav = useNavigate();
  
  const [RoomID, setRoomID] = useState()
  const [userName, setuserName] = useState()
  
  const createroomid=(e)=>{
    e.preventDefault();
    const id = uuid4v();
    // console.log(id)
          setRoomID(id);
    toast.success('Creating Room Successfully ')      

    

  }

  const onJoin = ()=>{
     if (!RoomID || !userName) {
     toast.error('Room id & Username is required')
     return ;
    }


    
     nav('/Editor/'+ RoomID,{
      state:{
        userName,
      },
    })
  } 
 



  return (
    <>

      <div className='homewrapper'>
        <div className='formjoin'>

          <img className='logo' src="/logo.png" alt="logo" />
          <div className="inpg">

            <input className='username' value={userName} onKeyUp={(e)=>{
  if (e.code ==="Enter") {
    onJoin();
  }
}} onChange={(e)=>{setuserName(e.target.value)}} type="text" placeholder='Enter Your Username' />
            <input className='roomid' value={RoomID} onChange={(e)=>setRoomID( e.target.value)} type="text" placeholder='Enter your Room ID' />
            <button onClick={onJoin}  className='btn'>Join</button>
            <div className="createrom">
            <span className='roomcreate'>😊if you don't have an invite then creates </span>
            <a onClick={createroomid} href="/">New Room</a>
            </div>
          </div>
        </div>
      </div>




    </>
  )
}

export default Home