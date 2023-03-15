import { useContext, useRef } from 'react';
import { UserInputContext } from '@/contexts/UserInputContext';
import singletonMatrix from '@/models/Matrix';
import './Cell.css';

type CellProps = {
  id: number;
  amount: number;
  onClickHandler: React.MouseEventHandler;
};

function Cell({ id, amount, onClickHandler }: CellProps) {
  const { userValues } = useContext(UserInputContext);
  const ref = useRef<null | HTMLTableCellElement>(null);

  const onMouseOverHandler = () => {
    const xCellsIds: Number[] = [];
    let upperBound = Math.ceil(userValues.X / 2);
    let lowerBound = Math.floor(userValues.X / 2);
    let upperExtension = 1;

    [...singletonMatrix.cells]
      .sort((prev, next) => prev.amount - next.amount)
      .every((cell, index, array) => {
        if (cell.id === id) {
          for (let i = index + 1; i <= index + upperBound; i++) {
            if (array[i]) xCellsIds.push(array[i].id);
            else lowerBound++;
          }
          for (let i = index - 1; i >= index - lowerBound; i--) {
            if (array[i]) xCellsIds.push(array[i].id);
            else if (array[index + upperBound + upperExtension])
              xCellsIds.push(array[index + upperBound + upperExtension++].id);
          }
          return false;
        }
        return true;
      });

    xCellsIds.forEach((id) => {
      document.getElementById(id.toString())?.classList.add('illuminated');
    });
    ref.current?.classList.add('active');
  };

  const onMouseOutHandler = () => {
    document.querySelectorAll('.illuminated').forEach((td) => {
      if (td.classList.contains('illuminated')) {
        td.classList.remove('illuminated');
      }
    });
    ref.current?.classList.remove('active');
  };

  return (
    <td
      onClick={onClickHandler}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      id={id.toString()}
      ref={ref}
    >
      {amount}
    </td>
  );
}

export default Cell;
