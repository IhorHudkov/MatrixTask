import {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { UserInputContext } from '@/contexts';
import { singletonMatrix } from '@/models';
import { Cell, PercentageCell, RemoveRowBtn } from '@/components';
import './Row.css';

type RowProps = {
  rowNumber: number;
  cellValue: number;
  setCellValue: Dispatch<SetStateAction<number>>;
};
function Row({ rowNumber, cellValue, setCellValue }: RowProps) {
  const sumCellRef = useRef<null | HTMLTableCellElement>(null);
  const [isOverSumCell, setIsOverSumCell] = useState(false);
  const { userValues } = useContext(UserInputContext);

  const rowValuesSum = useMemo(
    () =>
      singletonMatrix.matrix[rowNumber - 1].reduce(
        (sum, cell) => sum + cell.amount,
        0
      ),
    [userValues.N, cellValue, userValues.M]
  );

  const onCellClickHandler = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const cellId = Number(e.currentTarget.id);
    const cellValue = singletonMatrix.getCell(cellId).amount;
    singletonMatrix.increaseCellValue(cellId);
    e.currentTarget.innerText = cellValue.toString();
    setCellValue(cellValue);
  };

  const onMouseOverSumCellHandler = () => {
    sumCellRef.current?.classList.add('active');
    setIsOverSumCell(true);
  };

  const onMouseOutSumCellHandler = () => {
    sumCellRef.current?.classList.remove('active');
    setIsOverSumCell(false);
  };

  return (
    <tr className="table-row">
      <td className="row-number">{rowNumber}</td>
      {singletonMatrix.matrix[rowNumber - 1].map((cell, index) => {
        if (!isOverSumCell) {
          return (
            <Cell
              key={`C${index}`}
              id={cell.id}
              amount={cell.amount}
              onClickHandler={onCellClickHandler}
            ></Cell>
          );
        } else {
          return (
            <PercentageCell
              key={`S${index}`}
              amount={cell.amount}
              rowValuesSum={rowValuesSum}
            />
          );
        }
      })}
      <td
        ref={sumCellRef}
        onMouseOver={onMouseOverSumCellHandler}
        onMouseOut={onMouseOutSumCellHandler}
      >
        {rowValuesSum}
      </td>
      <td>
        <span className="remove-btn-cell">
          <RemoveRowBtn rowNumber={rowNumber} />
        </span>
      </td>
    </tr>
  );
}

export default Row;
