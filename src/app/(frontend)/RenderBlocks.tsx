'use client'

import React from 'react'
import Button from '@/components/Button'
// import Card from '@/components/Card'
// import Input from '@/components/Input'

const componentsMap: Record<string, React.FC<any>> = {
  Button,
  // Card,
  // Input,
}

export default function RenderBlocks({ content }: { content: any[] }) {
  if (!content) return null

  return (
    <div>
      {content.map((block, index) => {
        switch (block.blockType) {
          // ===== BLOQUE DE TEXTO =====
          case 'text':
            return (
              <div key={index} style={{ marginBottom: '1.5rem' }}>
                <p>{block.content}</p>
              </div>
            )

          // ===== BLOQUE DE EJEMPLO DE COMPONENTE =====
          case 'component_example': {
            const selectedComponent = block.component?.componentFile
            const ComponentToRender = componentsMap[selectedComponent]

            if (!ComponentToRender) {
              return (
                <div key={index} style={{ color: 'red' }}>
                  ⚠️ No se encontró el componente: {selectedComponent}
                </div>
              )
            }

            return (
              <div
                key={index}
                style={{
                  margin: '2rem 0',
                  border: '1px solid #e5e7eb',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: '#f9fafb',
                }}
              >
                <h3 style={{ marginBottom: '0.5rem' }}>{block.component?.name}</h3>
                {block.component?.description && (
                  <p style={{ marginBottom: '1rem', color: '#555' }}>
                    {block.component?.description}
                  </p>
                )}
                <ComponentToRender text={block.text_example || 'Botón de ejemplo'} />
              </div>
            )
          }

          // ===== BLOQUE DE TABLA DE PROPS =====
          case 'props_table':
            return (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Props</h3>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    border: '2px solid #333333ff',
                    fontSize: '0.95rem',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#f3f4f6' }}>
                      <th style={cellStyle}>Prop</th>
                      <th style={cellStyle}>Tipo</th>
                      <th style={cellStyle}>Requerida</th>
                      <th style={cellStyle}>Descripción</th>
                      <th style={cellStyle}>Por defecto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {block.props?.map((prop: any, j: number) => (
                      <tr key={j}>
                        <td style={cellStyle}>{prop.propName}</td>
                        <td style={cellStyle}>{prop.type}</td>
                        <td style={cellStyle}>{prop.required ? '✅' : '❌'}</td>
                        <td style={cellStyle}>{prop.description}</td>
                        <td style={cellStyle}>{prop.defaultValue || '-'}</td>
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

// ======= ESTILOS REUTILIZABLES =======
const cellStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #9d9d9dff',
  verticalAlign: 'top',
}
