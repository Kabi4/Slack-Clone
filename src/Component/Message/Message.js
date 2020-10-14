import React from 'react';
import './Message.css';

const Message = (props) => {
    return (
        <div className={"message "+props.type}>
            <img className="message__image" src={props.imagesrc} alt="avatar" />
            <div className="message__info">
                <h4>
                    {props.username} <span>{props.time}</span>
                </h4>
                <p>{props.content}</p>
            </div>
        </div>
    )
};

export default Message;
