import { useContext } from 'react';
import { MessageContext } from '@/contexts';
import './MessageContainer.css';

function MessageContainer() {
  const { message } = useContext(MessageContext);

  return message.isThereAMessage ? (
    <div className={`${message.type}-message message-container`}>
      <p>{message.message}</p>
    </div>
  ) : (
    <></>
  );
}

export default MessageContainer;
