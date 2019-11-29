import React, { useEffect, useRef } from 'react';
import moment from 'moment';

const Messages = ({ messages }) => {
  const chat = useRef(null);

  const chatMessages = messages.map((chat, key) => (
    <li className="d-flex justify-content-start mb-4" key={key}>
      <img
        src="https://via.placeholder.com/150"
        alt="avatar"
        className="avatar rounded-circle mr-2 ml-lg-3 ml-0 z-depth-1"
      />
      <div className="chat-body white p-3 ml-2 z-depth-1">
        <div className="header">
          <strong className="primary-font">{chat.username}</strong>
          <small className="pull-right text-muted">
            <i className="far fa-clock"></i> {moment(chat.timestamp).format('D.M.YYYY HH:mm:ss')}
          </small>
        </div>
        <hr className="w-100" />
        <p className="mb-0">{chat.message}</p>
      </div>
    </li>
  ));

  useEffect(() => {
    if (chat.current) {
      window.scrollTo(0, chat.current.scrollHeight);
    }
  }, [chatMessages]);

  return (
    <ul className="list-unstyled chat" ref={chat}>
      {chatMessages}
    </ul>
  );
};

export default Messages;
