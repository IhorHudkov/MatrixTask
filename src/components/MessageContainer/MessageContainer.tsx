import { useContext } from 'react';
import { MessageContext } from '@/contexts';
import './MessageContainer.css';

function MessageContainer() {
  const { message } = useContext(MessageContext);

  if (message.isThereAMessage) {
    return (
      <div className={`${message.type}-message message-container`}>
        <p>{message.message}</p>
      </div>
    );
  } else {
    return <></>;
  }
}

export default MessageContainer;
