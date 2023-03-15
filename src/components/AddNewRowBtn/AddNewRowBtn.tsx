import { useContext } from 'react';
import { UserInputContext, MessageContext } from '@/contexts';
import { singletonMatrix } from '@/models';
import { scrollToBottom } from '@/utils';

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
