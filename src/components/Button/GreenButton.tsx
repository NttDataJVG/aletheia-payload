// GreenButton.tsx
import React from 'react'
import Button, { ButtonProps } from './Button'

export const GreenButton: React.FC<Omit<ButtonProps, 'color'>> = (props) => (
  <Button {...props} color="green" />
)
