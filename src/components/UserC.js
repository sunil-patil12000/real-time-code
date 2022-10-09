import React from 'react'
import Avatar from 'react-avatar'


const User = ({username}) => {
    // console.log(username,"user");
  return (
    <div className='UserA flex flex-col  justify-center h-max w-max'>
       <Avatar name={username} size="50" round="14px" />
        <span>{username}</span>
    </div>
  )
}

export default User