'use client'
import '../styles/globals.css'
import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { theme } from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function RootLayout({ children }: { children: React.ReactNode }) {
 const queryClient = new QueryClient()
 return (
  <html lang='en'>
   <head>
    {/* <link rel='shortcut icon' href='/favicon.svg' /> */}
    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
    <ColorSchemeScript />
   </head>
   <body suppressHydrationWarning={true}>
    <QueryClientProvider client={queryClient}>
     <MantineProvider theme={theme}>
      {children}
      {/* <div className='dark:bg-boxdark-2 dark:text-bodydark'></div> */}
     </MantineProvider>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   </body>
  </html>
 )
}
