'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './components.css'

type RawPage = {
  id: string
  title: string
  fullSlug?: string
  parent?: string | { id?: string } | null
}

type Node = {
  id: string
  title: string
  fullSlug: string
  parentId: string | null
  children: Node[]
}

function normalize(pages: RawPage[]): Node[] {
  return pages.map((p) => {
    const parentId =
      typeof p.parent === 'string'
        ? p.parent
        : p.parent && typeof p.parent === 'object' && 'id' in p.parent
          ? ((p.parent as any).id ?? null)
          : null

    return {
      id: p.id,
      title: p.title || '(sin título)',
      fullSlug: (p.fullSlug || '').replace(/^\/+|\/+$/g, ''),
      parentId,
      children: [],
    }
  })
}

function inferParentsBySlug(nodes: Node[]) {
  const bySlug = new Map(nodes.map((n) => [n.fullSlug, n]))
  for (const n of nodes) {
    if (!n.parentId && n.fullSlug.includes('/')) {
      const pref = n.fullSlug.split('/').slice(0, -1).join('/')
      const parent = bySlug.get(pref)
      if (parent) n.parentId = parent.id
    }
  }
}

function buildTree(raw: RawPage[]): Node[] {
  const list = normalize(raw)
  inferParentsBySlug(list)
  const byId = new Map(list.map((n) => [n.id, n]))
  const roots: Node[] = []
  for (const n of list) {
    if (n.parentId && byId.has(n.parentId)) byId.get(n.parentId)!.children.push(n)
    else roots.push(n)
  }
  const sortRec = (arr: Node[]) => {
    arr.sort((a, b) => a.title.localeCompare(b.title, 'es'))
    arr.forEach((ch) => sortRec(ch.children))
  }
  sortRec(roots)
  return roots
}

function useActiveSlug() {
  const pathname = usePathname() || '/'
  return pathname.replace(/^\/+|\/+$/g, '')
}

function DesktopTree({ tree, activeSlug }: { tree: Node[]; activeSlug: string }) {
  const Item = ({ node, depth }: { node: Node; depth: number }) => {
    const href = node.fullSlug ? `/${node.fullSlug}` : '/'
    const isActive = node.fullSlug === activeSlug
    return (
      <li>
        <Link
          href={href}
          className={`vlink ${isActive ? 'is-active' : ''}`}
          style={{ paddingLeft: 12 + depth * 16 }}
        >
          {node.title}
        </Link>
        {node.children.length > 0 && (
          <ul className="vlist">
            {node.children.map((ch) => (
              <Item key={ch.id} node={ch} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    )
  }
  return (
    <nav className="sidebar__desktop" aria-label="Navegación de páginas">
      <ul className="vlist">
        {tree.map((n) => (
          <Item key={n.id} node={n} depth={0} />
        ))}
      </ul>
    </nav>
  )
}

export default function Sidebar({
  pages,
  isOpen,
  onNavigate,
}: {
  pages: RawPage[]
  isOpen: boolean
  onNavigate?: () => void
}) {
  const tree = React.useMemo(() => buildTree(pages || []), [pages])
  const activeSlug = useActiveSlug()

  // Cierra en móvil al navegar
  const handleClick = () => {
    if (window.innerWidth < 1024) onNavigate?.()
  }

  return (
    <aside className={`sidebar-dark ${isOpen ? 'is-open' : ''}`} aria-label="Sidebar">
      <div className="sidebar-inner" onClick={handleClick}>
        <DesktopTree tree={tree} activeSlug={activeSlug} />
      </div>
    </aside>
  )
}
