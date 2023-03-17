import React, { useContext, useRef } from 'react';
import { UserInputContext, XCellIdsContext } from '@/contexts';
import { singletonMatrix } from '@/models';
import './Cell.css';

type CellProps = {
  id: number;
  amount: number;
  onClickHandler: React.MouseEventHandler;
};
function Cell({ id, amount, onClickHandler }: CellProps) {
  const { userValues } = useContext(UserInputContext);
  const { setXCellIds } = useContext(XCellIdsContext);
  const cellRef = useRef<HTMLTableCellElement | null>(null);

  const onMouseOverHandler = () => {
    setXCellIds(singletonMatrix.getCellIdsClosestByValue(id, userValues.X));
    cellRef.current?.classList.add('active');
  };

  const onMouseOutHandler = () => {
    setXCellIds([]);
    cellRef.current?.classList.remove('active');
  };

  return (
    <td
      ref={cellRef}
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      id={id.toString()}
    >
      {amount}
    </td>
  );
}

export default Cell;
