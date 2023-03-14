import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type MessageType = 'error' | 'warning' | 'info' | 'empty';

export type Message = {
  isThereAMessage: boolean;
  type: MessageType;
  message: string;
};

export interface MessageContextInterface {
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

const defaultState = {
  message: {
    isThereAMessage: false,
    type: 'empty',
    message: '',
  },
  setMessage: (message: Message) => {},
} as MessageContextInterface;

export const MessageContext = createContext(defaultState);

type MessageProviderProps = {
  children: ReactNode;
};

export default function MessageProvider({ children }: MessageProviderProps) {
  const [message, setMessage] = useState<Message>({
    isThereAMessage: false,
    type: 'empty',
    message: '',
  });
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
