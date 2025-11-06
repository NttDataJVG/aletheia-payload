import React from 'react'

type ButtonProps = {
  text: string
  onClick?: () => void
  color?: 'blue' | 'red' | 'green'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const colorMap = {
  blue: '#007bff',
  red: '#dc3545',
  green: '#28a745',
}

const sizeMap = {
  small: '0.5rem 1rem',
  medium: '0.75rem 1.5rem',
  large: '1rem 2rem',
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = 'blue',
  size = 'medium',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: colorMap[color],
        color: '#fff',
        padding: sizeMap[size],
        border: 'none',
        borderRadius: '5px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = '#0056b3'
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.backgroundColor = colorMap[color]
      }}
    >
      {text}
    </button>
  )
}

export default Button
