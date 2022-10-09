
import React from 'react'
import UserC from '../components/UserC';
import EditorC from '../components/EditorC'
import { useRef, useEffect } from 'react';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { useLocation, useNavigate,Navigate,useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
const Editor = () => {
  const location = useLocation()
  const reactNavigator = useNavigate();
  const socketRef = useRef(null);
  const {RoomID}= useParams();


  const [UserData, setUserData] = useState([])

console.log(RoomID)
  useEffect(() => {
   const init = async()=>{
    socketRef.current=await initSocket();
    socketRef.current.on('connect_error',(err)=>handleErrors(err))
    socketRef.current.on('connect_failed',(err)=>handleErrors(err))
    function handleErrors(e){
      console.log('socket error', e);
      toast.error('socket connection error try again later');
      reactNavigator('/');
      
    }
    socketRef.current.emit(ACTIONS.JOIN,{
      RoomID,
      username:location.state?.userName,
    });



    socketRef.current.on(ACTIONS.JOINED,({clients,username,socketid})=>{
          if (username!==location.state?.username) {
            toast.success(`${username} Joined The Room`)
          }

         

          setUserData(clients)
    })





      socketRef.current.on(ACTIONS.DISCONNECTED,({socketid,username})=>{
                        toast.success(`${username} left the room`);
                        setUserData((prev)=>{
                          return prev.filter(
                            (client) => client.socketid !== socketid
                            
                            );
                        })
      })





   }
    init();

    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    }
  }, [])
  

// console.log(UserData)




  if (!location.state) {
    return <Navigate to="/"/>
  }

  return (
    <>

      <div className="meditor">
        <div className="sideBar flex flex-col">
          <div className="logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <h4 className=' m-2 mt-5 font-bold'>Connected</h4>
          <div className="users flex flex-wrap space-x-5 justify-center mt-4 h-full">
            {
              UserData.map((itme) => {
                return (
                  <UserC key={itme.socketid} username={itme.username} />
                 
                )
                console.log(itme.username);
              })
            }
          </div>
          <div className="btng flex flex-col">
            <button className=' copy mx-9 p-2 bg-white rounded-2xl font-bold'>copy Room ID</button>
            <button className='lave mx-9 mt-3 mb-8 p-2 rounded-2xl font-bold'>Lave</button>
          </div>





        </div>

        <div className="codeditor">
          <EditorC socketRef={socketRef} RoomID={RoomID} />
        </div>

      </div>












    </>
  )
}

export default Editor