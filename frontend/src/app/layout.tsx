import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { ReactQueryClientProvider as QueryClientProvider } from '../context/reactQueryClientProvider'
import { ReactMantineProvider } from '../context/reactMantineProvider'
// import { ColorSchemeScript } from '@mantine/core'
// import { theme } from '@/theme'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { ReactSessionProvider } from '../context/reactSessionProvider'

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
})

const RootLayout = ({ children }: { children: any }) => {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript />
				{/* <link rel='shortcut icon' href='/favicon.svg' /> */}
				{/* <style jsx global>{`
					html {
						font-family: ${inter.style.fontFamily};
					}
				`}</style> */}
				<meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no' />
			</head>
			<body suppressHydrationWarning={true} className={inter.className}>
				<ReactSessionProvider>
					<QueryClientProvider>
						<ReactMantineProvider>{children}</ReactMantineProvider>
						{/* <div className='dark:bg-boxdark-2 dark:text-bodydark'></div> */}
					</QueryClientProvider>
				</ReactSessionProvider>
			</body>
		</html>
	)
}

export default RootLayout
