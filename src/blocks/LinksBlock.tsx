'use client'

import Link from 'next/link'

export default function LinksBlock({ links }: { links: any[] }) {
  if (!links?.length) return null

  return (
    <div className="links-block my-8">
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.page?.fullSlug || link.page?.slug}`}
              className="text-blue-600 hover:underline text-lg"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
