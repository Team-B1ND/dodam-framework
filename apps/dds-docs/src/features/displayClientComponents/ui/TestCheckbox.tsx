"use client"

import { Checkbox, CheckboxProps } from 'dodam-design-system/components'
import { useState } from 'react'

const TestCheckbox = ({
  disabled,
  type,
  size,
  checkboxCustomStyle
}: CheckboxProps) => {
  const [selected, setSelected] = useState(true);
  return (
    <Checkbox 
      selected={selected} 
      onClick={() => setSelected(prev => !prev)} 
      disabled={disabled}
      type={type}
      size={size}
      checkboxCustomStyle={checkboxCustomStyle}
    />
  )
}

export default TestCheckbox