import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { Socket } from 'socket.io-client';
import ACTIONS from '../Actions';


const EditorC = ({socketRef,RoomID}) => {

    const editorRef = useRef(null);
    
    useEffect(() => {
        async function init() {
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: 'javascript', json: true },
                    theme: 'dracula',
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            editorRef.current.on('change',(instance,changes)=>{
                // console.log(changes)
                const {origin}=changes;
                const code=instance.getValue();
                if (origin !== 'setValue') {

                    
                    socketRef.current.emit(ACTIONS.CODE_CHANGE,{
                                RoomID,code,
                    })
                }
            });


           
            
        }
        init();
    },[]);
useEffect(()=>{
    if(socketRef.current){


        socketRef.current.on(ACTIONS.CODE_CHANGE,({code})=>{

            console.log(code);
            if (code !== null) {
                editorRef.current.setValue(code);
            }
        });
    }

    

},[socketRef.current])
    
// this is id of textarea
    return <textarea name="realtimeEditor" id="realtimeEditor" cols="30" rows="10"></textarea>
};

export default EditorC;