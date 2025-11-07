'use client'

import React from 'react'
import Button from '@/components/Button'
import './styles.css'

const componentsMap: Record<string, React.FC<any>> = {
  Button,
}

export default function RenderBlocks({ content }: { content: any[] }) {
  if (!content) return null

  return (
    <div>
      {content.map((block, index) => {
        switch (block.blockType) {
          case 'text':
            return (
              <div key={index} className="block-text">
                <p>{block.content}</p>
              </div>
            )

          case 'component_example': {
            const selectedComponent = block.component?.componentFile
            const ComponentToRender = componentsMap[selectedComponent]

            if (!ComponentToRender) {
              return (
                <div key={index} style={{ color: 'red' }}>
                  No se encontró el componente: {selectedComponent}
                </div>
              )
            }

            return (
              <div key={index} className="block-component">
                <h3 className="block-component__title">{block.component?.name}</h3>
                {block.component?.description && (
                  <p className="block-component__description">{block.component?.description}</p>
                )}
                <ComponentToRender text={block.text_example || 'Botón de ejemplo'} />
              </div>
            )
          }

          case 'props_table':
            return (
              <div key={index} className="block-props-table">
                <h3 className="block-props-table__title">Props</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Prop</th>
                      <th>Tipo</th>
                      <th>Requerida</th>
                      <th>Descripción</th>
                      <th>Por defecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.props?.map((prop: any, j: number) => (
                      <tr key={j}>
                        <td>{prop.propName}</td>
                        <td>{prop.type}</td>
                        <td>{prop.required ? '✅' : '❌'}</td>
                        <td>{prop.description}</td>
                        <td>{prop.defaultValue || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
