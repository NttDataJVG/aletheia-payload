// RedButton.tsx
import React from 'react'
import Button, { ButtonProps } from './Button'

export const RedButton: React.FC<Omit<ButtonProps, 'color'>> = (props) => (
  <Button {...props} color="red" />
)
