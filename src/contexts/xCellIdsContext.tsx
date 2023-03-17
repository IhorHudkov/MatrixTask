import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export interface XCellIdsContextInterface {
  xCellIds: Number[];
  setXCellIds: Dispatch<SetStateAction<Number[]>>;
}

const defaultState = {
  xCellIds: [],
  setXCellIds: (xCellIds: Number[]) => {},
} as XCellIdsContextInterface;

export const XCellIdsContext = createContext(defaultState);

type xCellIdsProviderProps = {
  children: ReactNode;
};

export default function XCellIdsProvider({ children }: xCellIdsProviderProps) {
  const [xCellIds, setXCellIds] = useState<Number[]>([]);
  return (
    <XCellIdsContext.Provider value={{ xCellIds, setXCellIds }}>
      {children}
    </XCellIdsContext.Provider>
  );
}
