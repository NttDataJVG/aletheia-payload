'use client'
import React from 'react'
import './blocks.css'

export default function CodeBlock({ block }: { block: any }) {
  if (!block?.code) return null

  return (
    <div className="block-code">
      {block.title && <h3>{block.title}</h3>}
      {block.text && <p>{block.text}</p>}

      <pre className="code-black-container">
        <code>{block.code}</code>
      </pre>
    </div>
  )
}
