// BlueButton.tsx
import React from 'react'
import Button, { ButtonProps } from './Button'

export const BlueButton: React.FC<Omit<ButtonProps, 'color'>> = (props) => (
  <Button {...props} color="blue" />
)
