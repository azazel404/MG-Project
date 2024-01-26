'use client'
import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme'

export const ReactMantineProvider = ({ children }: { children: React.ReactNode }) => {
	return <MantineProvider theme={theme}>{children}</MantineProvider>
}
