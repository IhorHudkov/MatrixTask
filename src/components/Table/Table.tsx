import { useCallback, useContext, useState } from 'react';
import { UserInputContext, MessageContext } from '@/contexts';
import { arrayFromNumber } from '@/utils';
import { singletonMatrix } from '@/models';
import { CellValue } from '@/models/Matrix';
import { Row } from '@/components';
import './Table.css';

function Table() {
  const { userValues } = useContext(UserInputContext);
  const { message } = useContext(MessageContext);
  const [cellValue, setCellValue] = useState<CellValue>(0);

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

  if (!message.isThereAMessage) {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              {arrayFromNumber(userValues.N).map((num, index) => (
                <th key={index}>{num}</th>
              ))}
              <th>Sum values</th>
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
              <td>Average values</td>
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
