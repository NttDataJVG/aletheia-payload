import React from 'react'

type RichNode = {
  type: string
  children?: RichNode[]
  text?: string

  // para heading
  tag?: string

  // para listas
  listType?: 'bullet' | 'number'
  format?: number
  style?: string

  // para links
  fields?: { url?: string }
  url?: string

  // por si acaso hay cualquier otra cosa
  [key: string]: any
}

export function renderRichTextNodes(nodes?: RichNode[]): React.ReactNode {
  if (!nodes || nodes.length === 0) return null

  return nodes.map((node, index) => {
    switch (node.type) {
      /**
       * ROOT (Lexical suele envolverte todo en un "root")
       */
      case 'root':
        return <React.Fragment key={index}>{renderRichTextNodes(node.children)}</React.Fragment>

      /**
       * PÁRRAFOS
       */
      case 'paragraph':
        return <p key={index}>{renderRichTextNodes(node.children)}</p>

      /**
       * HEADINGS -> viene como type: "heading" y tag: "h1" | "h2" | ...
       */
      case 'heading': {
        const children = renderRichTextNodes(node.children)

        switch (node.tag) {
          case 'h1':
            return <h1 key={index}>{children}</h1>
          case 'h2':
            return <h2 key={index}>{children}</h2>
          case 'h3':
            return <h3 key={index}>{children}</h3>
          case 'h4':
            return <h4 key={index}>{children}</h4>
          case 'h5':
            return <h5 key={index}>{children}</h5>
          case 'h6':
            return <h6 key={index}>{children}</h6>
          default:
            return <h2 key={index}>{children}</h2>
        }
      }

      /**
       * LISTAS (Lexical suele usar "list" + listType: "bullet" | "number")
       */
      case 'list': {
        const isOrdered = node.listType === 'number'
        const ListTag = (isOrdered ? 'ol' : 'ul') as 'ol' | 'ul'
        return <ListTag key={index}>{renderRichTextNodes(node.children)}</ListTag>
      }

      case 'listitem':
      case 'listItem':
      case 'li':
        return <li key={index}>{renderRichTextNodes(node.children)}</li>

      /**
       * CITA / BLOCKQUOTE
       */
      case 'quote':
        return <blockquote key={index}>{renderRichTextNodes(node.children)}</blockquote>

      /**
       * LINKS
       */
      case 'link': {
        const url = node.fields?.url || node.url || '#'
        return (
          <a key={index} href={url}>
            {renderRichTextNodes(node.children)}
          </a>
        )
      }

      /**
       * TEXTO
       */
      case 'text': {
        let content: React.ReactNode = node.text ?? ''

        // Ejemplo (por si acaso también vienen flags booleanos antiguos)
        const isBold = node.bold || (typeof node.format === 'number' && (node.format & 1) !== 0)
        const isItalic = node.italic || (typeof node.format === 'number' && (node.format & 2) !== 0)
        const isUnderline =
          node.underline || (typeof node.format === 'number' && (node.format & 4) !== 0)

        if (isBold) content = <strong>{content}</strong>
        if (isItalic) content = <em>{content}</em>
        if (isUnderline) content = <u>{content}</u>

        return <React.Fragment key={index}>{content}</React.Fragment>
      }

      /**
       * FALLBACK: si llega algo raro, se intenta bajar a sus hijos
       */
      default:
        return (
          <React.Fragment key={index}>
            {node.children ? renderRichTextNodes(node.children) : null}
          </React.Fragment>
        )
    }
  })
}
