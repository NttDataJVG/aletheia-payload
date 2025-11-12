'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  RefreshRouteOnSave as PayloadRefreshRouteOnSave, // 👈 alias para evitar conflictos
} from '@payloadcms/live-preview-react'

/**
 * Bridge para Server-side Live Preview (Next App Router):
 * - Escucha eventos del Admin (autosave/save/publish)
 * - Llama a router.refresh() para rehidratar datos del servidor
 */
// ARREGLAR ESTO, QUE EN UN FUTURO SE USAR EL .env
export default function LivePreviewBridge() {
  const router = useRouter()
  const origin =
    process.env.NEXT_PUBLIC_PAYLOAD_URL ??
    (typeof window !== 'undefined' ? window.location.origin : '')

  return <PayloadRefreshRouteOnSave serverURL={origin} refresh={() => router.refresh()} />
}
