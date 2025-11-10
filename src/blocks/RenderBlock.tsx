'use client'
import React from 'react'
import TextBlock from './TextBlock'
import ComponentExampleBlock from './ComponentExampleBlock'
import PropsTableBlock from './PropsTableBlock'

export default function RenderBlocks({ content }: { content: any[] }) {
  if (!content) return null

  return (
    <>
      {content.map((block, index) => {
        switch (block.blockType) {
          case 'text':
            return <TextBlock key={index} content={block.content} />

          case 'component_example':
            return <ComponentExampleBlock key={index} block={block} />

          case 'props_table':
            return <PropsTableBlock key={index} propsList={block.props} />

          default:
            return null
        }
      })}
    </>
  )
}
