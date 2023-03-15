import { useContext, useState } from 'react';
import { UserInputContext } from '@/contexts/UserInputContext';
import singletonMatrix from '@/models/Matrix';
import './RemoveRowBtn.css';

type RemoveRowBtnProps = {
  rowNumber: number;
};

function RemoveRowBtn({ rowNumber }: RemoveRowBtnProps) {
  const [isActive, setIsActive] = useState(false);
  const { userValues, setUserValues } = useContext(UserInputContext);
  const onMouseOverHandler = () => {
    setIsActive(true);
  };
  const onMouseOutHandler = () => {
    setIsActive(false);
  };
  const onClickHandler = () => {
    singletonMatrix.removeRow(rowNumber);
    setUserValues({
      M: singletonMatrix.rows,
      N: singletonMatrix.columns,
      X: userValues.X,
    });
  };
  return (
    <img
      className="remove-row-btn"
      src={isActive ? './deleteIconActive.png' : './deleteIcon.png'}
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      onClick={onClickHandler}
    />
  );
}

export default RemoveRowBtn;
