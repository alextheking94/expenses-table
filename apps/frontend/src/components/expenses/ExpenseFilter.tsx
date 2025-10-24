import { Filter } from '../ds/Filter';

interface Props {
  filterOptions: {
    id: string;
    selected: boolean;
    onClick: () => void;
    title: string;
  }[];
}

export const ExpenseFilter = ({ filterOptions }: Props) => {
  return (
    <div>
      <Filter title="Expense Status" isMultiSelect={true} filterOptions={filterOptions} />
    </div>
  );
};
