import { ChangeEvent, useContext } from 'react';
import { UserInputContext } from '../../contexts/UserInputContext';
import singletonMatrix from '../../models/Matrix';
import './UserInput.css';

function UserInput() {
  const { userValues, setUserValues } = useContext(UserInputContext);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;

    if (inputId === 'M') {
      if (singletonMatrix.isMatrixCreated) {
        if (Number(e.target.value) < userValues.M) {
          for (let i = 0; i < userValues.M - Number(e.target.value); i++)
            singletonMatrix.removeRow();
        }
        if (Number(e.target.value) > userValues.M) {
          for (let i = 0; i < Number(e.target.value) - userValues.M; i++)
            singletonMatrix.addRow();
        }
      } else {
        singletonMatrix.create(Number(e.target.value), userValues.N);
      }
    }
    if (inputId === 'N') {
      if (singletonMatrix.isMatrixCreated) {
        if (Number(e.target.value) < userValues.N) {
          for (let i = 0; i < userValues.N - Number(e.target.value); i++)
            singletonMatrix.removeColumn();
        }
        if (Number(e.target.value) > userValues.N) {
          for (let i = 0; i < Number(e.target.value) - userValues.N; i++)
            singletonMatrix.addColumn();
        }
      } else {
        singletonMatrix.create(userValues.M, Number(e.target.value));
      }
    }
    setUserValues((prev) => ({ ...prev, [inputId]: Number(e.target.value) }));
  };

  return (
    <header>
      <span>
        <label htmlFor="M">Number of table rows</label>
        <input
          type="number"
          id="M"
          onInput={onChangeHandler}
          value={userValues.M}
        />
      </span>

      <span>
        <label htmlFor="N">Number of table columns</label>
        <input
          type="number"
          id="N"
          onInput={onChangeHandler}
          value={userValues.N}
        />
      </span>
      <span>
        <label htmlFor="X">
          Сells where amount is closest to the amount of hovered cell
        </label>
        <input
          type="number"
          id="X"
          onInput={onChangeHandler}
          value={userValues.X}
        />
      </span>
    </header>
  );
}

export default UserInput;
