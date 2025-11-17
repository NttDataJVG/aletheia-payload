'use client'
import React from 'react'
import TextBlock from './TextBlock'
import ComponentExampleBlock from './ComponentExampleBlock'
import PropsTableBlock from './PropsTableBlock'
import LinksBlock from './LinksBlock'
import CodeBlock from './CodeBlock'
import IconExampleBlock from './IconExampleBlock'

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

          case 'links':
            return <LinksBlock key={index} links={block.links} />

          case 'code':
            return <CodeBlock key={index} code={block.code} />

          case 'icon_example':
            return <IconExampleBlock key={index} block={block} />

          default:
            return null
        }
      })}
    </>
  )
}
