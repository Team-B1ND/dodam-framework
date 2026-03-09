"use client"

import { Checkbox, CheckboxProps } from '@b1nd/dodam-design-system/components'
import { useState } from 'react'

const TestCheckbox = ({
  disabled,
  type,
  size,
  variant,
  checkboxCustomStyle
}: Partial<CheckboxProps>) => {
  const [selected, setSelected] = useState(true);
  return (
    <Checkbox
      selected={selected}
      onClick={() => setSelected(prev => !prev)}
      disabled={disabled}
      type={type}
      size={size}
      variant={variant}
      checkboxCustomStyle={checkboxCustomStyle}
    />
  )
}

export default TestCheckbox