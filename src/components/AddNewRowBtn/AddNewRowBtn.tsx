import singletonMatrix from '../../models/Matrix';
import { useContext } from 'react';
import { UserInputContext } from '../../contexts/UserInputContext';
import scrollToBottom from '../../utils/scrollToBottom';

function AddNewRowBtn() {
  const { userValues, setUserValues } = useContext(UserInputContext);

  const onClickHandler = () => {
    scrollToBottom();
    singletonMatrix.addRow();
    setUserValues({
      M: singletonMatrix.rows,
      N: singletonMatrix.columns,
      X: userValues.X,
    });
  };
  return <button onClick={onClickHandler}>Add row</button>;
}

export default AddNewRowBtn;
