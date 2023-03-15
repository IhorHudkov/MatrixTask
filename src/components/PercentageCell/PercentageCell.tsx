import './PercentageCell.css';

type PercentageCellProps = {
  amount: number;
  rowValuesSum: number;
};

function PercentageCell({ amount, rowValuesSum }: PercentageCellProps) {
  const percentage = ((100 * amount) / rowValuesSum).toFixed(0);
  return (
    <td
      style={{
        background: `linear-gradient(to top, pink, ${percentage}%, white )`,
      }}
    >
      {percentage + '%'}
    </td>
  );
}

export default PercentageCell;
