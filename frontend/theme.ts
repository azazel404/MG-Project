'use client'

import { createTheme, MantineColorsTuple } from '@mantine/core'
export const theme = createTheme({
 /* Put your mantine theme override here */
 colors: {
  brand: ['#f7f3f2', '#e7e5e5', '#d2c9c6', '#bdaaa4', '#ab9087', '#a17f75', '#F2BA01', '#F2BA01', '#F2BA01', '#F2BA01'],
 },
 // fontFamily: 'Roboto',
 primaryColor: 'brand',
})
