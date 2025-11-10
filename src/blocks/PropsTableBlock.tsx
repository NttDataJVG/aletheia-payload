'use client'
import React from 'react'
import './blocks.css'

export default function PropsTableBlock({ propsList }: { propsList: any[] }) {
  return (
    <div className="block-props-table">
      <h3>Props</h3>
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
          {propsList.map((prop, i) => (
            <tr key={i}>
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
}
