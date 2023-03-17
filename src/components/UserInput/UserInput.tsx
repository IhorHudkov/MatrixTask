import { ChangeEvent, useContext, useRef } from 'react';
import { MessageContext, UserInputContext } from '@/contexts';
import { singletonMatrix } from '@/models';
import './UserInput.css';

function UserInput() {
  const { userValues, setUserValues } = useContext(UserInputContext);
  const { setMessage } = useContext(MessageContext);
  const headerRef = useRef<HTMLElement>(null);

  const maxX = Math.ceil(((userValues.M * userValues.N) / 100) * 15);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputId = e.target.id;
    let maxValue = 100;
    if (inputId === 'X') maxValue = maxX;
    if (Number(e.target.value) > maxValue) {
      e.target.classList.add('input-error');
      e.target.value = '0';
      setMessage({
        type: 'error',
        isThereAMessage: true,
        message: `Must be no more than ${maxValue}`,
      });
    } else {
      headerRef.current
        ?.querySelectorAll('.input-error')
        .forEach((el) => el.classList.remove('input-error'));
      setMessage({
        type: 'empty',
        isThereAMessage: false,
        message: '',
      });
    }

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
    <header ref={headerRef}>
      <span>
        <label htmlFor="M">Number of table rows (0 - 100)</label>
        <input
          type="number"
          id="M"
          onInput={onChangeHandler}
          value={userValues.M}
          min="0"
          max="100"
        />
      </span>
      <span>
        <label htmlFor="N">Number of table columns (0 - 100)</label>
        <input
          type="number"
          id="N"
          onInput={onChangeHandler}
          value={userValues.N}
          min="0"
          max="100"
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
          min="0"
          max={maxX}
        />
      </span>
    </header>
  );
}

export default UserInput;
