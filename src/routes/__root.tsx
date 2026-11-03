import React from 'react'
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Mariage Sifa & Rony • 26 Décembre 2026' },
      {
        name: 'description',
        content:
          "Invitation officielle & RSVP pour le mariage de Sifa Djuma et Rony Kaleng, le Samedi 26 Décembre 2026 à Lubumbashi.",
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased [overflow-wrap:anywhere]">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
