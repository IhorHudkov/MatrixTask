import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export type UserInputValues = {
  M: number;
  N: number;
  X: number;
};
export interface UserInputContextInterface {
  userValues: UserInputValues;
  setUserValues: Dispatch<SetStateAction<UserInputValues>>;
}

const defaultState = {
  userValues: {
    M: 0,
    N: 0,
    X: 0,
  },
  setUserValues: (values: UserInputValues) => {},
} as UserInputContextInterface;

export const UserInputContext = createContext(defaultState);

type UserInputProviderProps = {
  children: ReactNode;
};

export default function UserInputProvider({
  children,
}: UserInputProviderProps) {
  const [userValues, setUserValues] = useState<UserInputValues>({
    M: 0,
    N: 0,
    X: 0,
  });
  return (
    <UserInputContext.Provider value={{ userValues, setUserValues }}>
      {children}
    </UserInputContext.Provider>
  );
}
