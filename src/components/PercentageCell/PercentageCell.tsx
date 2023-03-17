import './PercentageCell.css';

type PercentageCellProps = {
  amount: number;
  rowValuesSum: number;
};

function PercentageCell({ amount, rowValuesSum }: PercentageCellProps) {
  const percentage = ((100 * amount) / rowValuesSum).toFixed(0);
  return (
    <td className="percentage-cell">
      <span
        className="percentage-background"
        style={{
          backgroundSize: `100% ${percentage}%`,
        }}
      ></span>
      <span>{percentage + '%'}</span>
    </td>
  );
}

export default PercentageCell;
