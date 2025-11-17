'use client'
import React from 'react'
import './blocks.css'

export default function CodeBlock({ code }: { code: string }) {
  if (!code) return null

  return (
    <div className="code-block">
      <pre className="code-block__pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}
