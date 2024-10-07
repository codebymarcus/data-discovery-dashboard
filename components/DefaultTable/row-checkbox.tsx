'use client'

import { RowCheckboxProps } from "./types";
import { Checkbox } from '@/components/ui/checkbox'

function RowCheckbox<TData>({ row }: RowCheckboxProps<TData>) {
  
  const handleChange = (checked: boolean | 'indeterminate') => {
    row.toggleSelected(checked === true);
  }

  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={handleChange}
    />
  )
}

export default RowCheckbox