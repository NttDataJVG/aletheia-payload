'use client'
import React from 'react'
import './blocks.css'

export default function TextBlock({ content }: { content: string }) {
  return (
    <div className="block-text">
      <p>{content}</p>
    </div>
  )
}
