import React, { useEffect,useState,useRef } from 'react';
import { useParams, withRouter } from 'react-router';
import db from '../../Firebase/Firebase';
import firebase from 'firebase';

import './Chat.css';

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import SendIcon from '@material-ui/icons/Send';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from '../Message/Message';
import { connect } from 'react-redux';

const Chat = React.memo((props) => {
    const param = useParams();
    const chatBox = useRef(null);
    const [roomName,setroomName] = useState("");
    const [roomInbox,setroomInbox] = useState([]);
    const [message,setmessage] = useState('');
    const [mesendMessage,setMeSendMessage] = useState("");
    const [first,setFirst] = useState(false);
    
    useEffect(()=>{
        setTimeout(()=>{
            chatBox.current.scrollTop = chatBox.current.scrollHeight - chatBox.current.clientHeight;
            setFirst(false);
        },1000)
    },[])
    useEffect(()=>{
        db.collection("rooms").doc(param.roomid)
        .onSnapshot(Snapshot=>{
            setroomName(Snapshot.data().name);
        })
        db.collection("rooms").doc(param.roomid)
        .collection("messages")
        .orderBy("timestamp",'asc')
        .onSnapshot(snapshot=>{
            setroomInbox(snapshot.docs.map(ele=>{
                return {id: ele.id,data: ele.data()};
            }))
            setMeSendMessage(mesendMessage===""?" ":"");
        })
    },[param])

    const sendMessage = ()=>{
        if(message.trim()!==""){
            db.collection("rooms").doc(param.roomid)
            .collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: props.user.name,
                userimg: props.user.photoUrl,
                message: message
            })
            .then(res=>{
                setmessage("");
                setMeSendMessage(mesendMessage===""?" ":"");
            })
            .catch(err=>{
                alert("SOMETHING FISHY HAPPENDED CAN'T SEND YOUR MESSAGE");
            })
        }
    };

    useEffect(()=>{
        setTimeout(()=>{
            chatBox.current.scrollTop = chatBox.current.scrollHeight - chatBox.current.clientHeight;
            setFirst(false);
        },10)
    },[mesendMessage])

    return (
        <div ref={chatBox} className="chat">
            <div className="chat__header">
                <div className="chat__header__left">
                        <h4 className="channel__name">
                            <strong>#{roomName}</strong>
                            <StarBorderOutlinedIcon/>
                        </h4>
                </div>
                <div className="chat__header__right">
                    <p>
                        <InfoOutlinedIcon/> Details
                    </p>
                </div>
            </div>
            <div className="chat__messages">
                {roomInbox.length>0 && roomInbox.map(ele=>{
                    return ele.data.timestamp?<Message key={ele.id} type={"other"} time={new Date(ele.data.timestamp.toDate()).toUTCString()} username={ele.data.username} imagesrc={ele.data.userimg} content={ele.data.message} />:null
                })}
            </div>
            <input 
                onKeyDown={
                    (e)=>{
                        if(e.key==="Enter"){
                            e.preventDefault();
                            sendMessage();
                        }
                    }
                }
                value={message}
                onChange={(e)=>{ e.preventDefault(); setmessage(e.target.value)}} 
                className="chat__input" 
                placeholder="Enter Your Text Here...."/>
            <SendIcon onClick={(e)=>{ e.preventDefault(); sendMessage(); }} className="inputSend" />
        </div>
    )
});

const mapStateToProps = (state)=>{
    return{
      user: state.auth.user
    }
};

export default withRouter(connect(mapStateToProps,null)(Chat));