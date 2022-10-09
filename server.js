const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const ACTIONS = require('./src/Actions');



const server = http.createServer(app);
const io = new Server(server);


const userSocketMap={};


function getAllclients(RoomID){
     return Array.from(io.sockets.adapter.rooms.get(RoomID) || []).map((socketid)=>{
        return {
            socketid,
            username:userSocketMap[socketid],
        };
     });
}

io.on('connection', (socket)=>{
    console.log('socket connected', socket.id)
    

    socket.on(ACTIONS.JOIN,({RooID,username})=>{
        userSocketMap[socket.id]=username;
        socket.join(RooID);
    const clients=getAllclients(RooID);

    console.log(clients);

    clients.forEach(({socketid})=>{
        io.to(socketid).emit(ACTIONS.JOINED,{
            clients,
            username,
            socketid: socket.id,
        })
    })


    socket.on(ACTIONS.CODE_CHANGE,({roomid,code})=>{
       
        socket.in(roomid).emit(ACTIONS.CODE_CHANGE,{code});
    })








    socket.on('disconnecting',()=>{
        const rooms = [...socket.rooms];
        rooms.forEach((roomid)=>{
            socket.in(roomid).emit(ACTIONS.DISCONNECTED, {
                socketid:socket.id,
                username:userSocketMap[socket.id],
            });
        })
    
        delete userSocketMap[socket.id];
        socket.leave();
    })
});






})








const PORT = process.env.PORT || 5000;
server.listen(PORT,()=>console.log(`listen port ${PORT}`))