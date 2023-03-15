import { useContext } from 'react';
import { UserInputContext } from '@/contexts/UserInputContext';
import { MessageContext } from '@/contexts/MessageContext';
import singletonMatrix from '@/models/Matrix';
import scrollToBottom from '@/utils/scrollToBottom';

function AddNewRowBtn() {
  const { userValues, setUserValues } = useContext(UserInputContext);
  const { message } = useContext(MessageContext);

  const onClickHandler = () => {
    scrollToBottom();
    singletonMatrix.addRow();
    setUserValues({
      M: singletonMatrix.rows,
      N: singletonMatrix.columns,
      X: userValues.X,
    });
  };
  if (!message.isThereAMessage) {
    return <button onClick={onClickHandler}>Add row</button>;
  } else {
    return <></>;
  }
}

export default AddNewRowBtn;
