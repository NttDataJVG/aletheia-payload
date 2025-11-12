'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useLivePreview } from '@payloadcms/live-preview-react'

export default function LivePreviewBridge({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useLivePreview({
    // si tu Payload y Next están en el mismo proyecto/origen, puedes omitir serverURL
    // serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL,
    depth: 1, // ajusta si necesitas relaciones más profundas
    refresh: () => router.refresh(), // 🔑 vuelve a pedir datos al servidor
  })

  return <>{children}</>
}
