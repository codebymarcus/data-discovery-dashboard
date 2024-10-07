'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { HeaderCheckboxProps } from './types';

function HeaderCheckbox<TData>({
  table
}: HeaderCheckboxProps<TData>) {

  const isIndeterminate = table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected();

  const handleChange = (checked: boolean | 'indeterminate') => {
    if (isIndeterminate) {
      table.toggleAllRowsSelected(false);
    } else {
      table.toggleAllRowsSelected(checked === true);
    }
  }


  return (
    <Checkbox
      checked={isIndeterminate ? 'indeterminate' : table.getIsAllRowsSelected()}
      onCheckedChange={handleChange}
    />
  )
}
export default HeaderCheckbox;