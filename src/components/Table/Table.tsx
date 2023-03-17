import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { UserInputContext, MessageContext, XCellIdsContext } from '@/contexts';
import { arrayFromNumber } from '@/utils';
import { singletonMatrix } from '@/models';
import { CellValue } from '@/models/Matrix/Matrix';
import { Row } from '@/components';
import './Table.css';

function Table() {
  const { userValues } = useContext(UserInputContext);
  const { message } = useContext(MessageContext);
  const { xCellIds } = useContext(XCellIdsContext);
  const [cellValue, setCellValue] = useState<CellValue>(0);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const columnValuesAverage = useCallback(
    (index: number) =>
      (
        singletonMatrix.matrix.reduce(
          (sum, cellArray) => sum + cellArray[index].amount,
          0
        ) / singletonMatrix.matrix.length
      ).toFixed(1),
    [userValues.M, cellValue]
  );

  useLayoutEffect(() => {
    tableRef.current?.querySelectorAll('td').forEach((td) => {
      if (td.classList.contains('illuminated')) {
        td.classList.remove('illuminated');
      }
    });

    xCellIds.forEach((id) => {
      tableRef.current
        ?.querySelector(`td[id='${id}']`)
        ?.classList.add('illuminated');
    });
  }, [xCellIds]);

  if (!message.isThereAMessage) {
    return (
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th></th>
              {arrayFromNumber(userValues.N).map((num, index) => (
                <th key={index}>{num}</th>
              ))}
              <th>Sum values</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {arrayFromNumber(userValues.M).map((num, index) => (
              <Row
                key={`M${index}`}
                rowNumber={num}
                cellValue={cellValue}
                setCellValue={setCellValue}
              />
            ))}
            <tr>
              <td className="text-bold">Average values</td>
              {arrayFromNumber(userValues.N).map(
                (num, index) =>
                  userValues.M > 0 && (
                    <td key={`N${index}`}>{columnValuesAverage(index)}</td>
                  )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Table;
