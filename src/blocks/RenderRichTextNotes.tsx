import React from 'react'

export function renderRichTextNodes(nodes: any[]): React.ReactNode {
  if (!nodes) return null

  return nodes.map((node: any, index: number) => {
    switch (node.type) {
      case 'paragraph':
        return <p key={index}>{renderRichTextNodes(node.children)}</p>

      case 'heading1':
        return <h1 key={index}>{renderRichTextNodes(node.children)}</h1>
      case 'heading2':
        return <h2 key={index}>{renderRichTextNodes(node.children)}</h2>
      case 'heading3':
        return <h3 key={index}>{renderRichTextNodes(node.children)}</h3>

      case 'unorderedList':
      case 'bulletList':
        return <ul key={index}>{renderRichTextNodes(node.children)}</ul>

      case 'orderedList':
        return <ol key={index}>{renderRichTextNodes(node.children)}</ol>

      case 'listItem':
      case 'listitem':
        return <li key={index}>{renderRichTextNodes(node.children)}</li>

      case 'link': {
        const url = node.fields?.url || '#'
        return (
          <a key={index} href={url}>
            {renderRichTextNodes(node.children)}
          </a>
        )
      }

      case 'text': {
        let content: React.ReactNode = node.text ?? ''

        if (node.bold) content = <strong>{content}</strong>
        if (node.italic) content = <em>{content}</em>
        if (node.underline) content = <u>{content}</u>

        return <React.Fragment key={index}>{content}</React.Fragment>
      }

      default:
        return <React.Fragment key={index}>{renderRichTextNodes(node.children)}</React.Fragment>
    }
  })
}
