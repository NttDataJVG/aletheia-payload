// Button.tsx (componente base)
import React from 'react'
import '../components.css'

export type ButtonProps = {
  text: string
  onClick?: () => void
  color?: 'blue' | 'red' | 'green'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = 'blue',
  size = 'medium',
  disabled = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn btn--${color} btn--${size}`}>
      {text}
    </button>
  )
}

export default Button
