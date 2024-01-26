'use client'
import React, { useState } from 'react'
import Sidebar from '@/src/components/sidebar'
import Header from '@/src/components/header'
import { useMediaQuery } from '@mantine/hooks'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const isMobileView = useMediaQuery('(max-width: 1026px)')

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		console.log('window.innerWidth', window.innerWidth)
	// 		setSidebarOpen(window.innerWidth > 768)
	// 	}

	// 	window.addEventListener('resize', handleResize)

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize)
	// 	}
	// }, [])

	return (
		<>
			{/* flex */}
			<div className='bg-body-1 overflow-hidden relative'>
				{/* <!-- ===== Sidebar Start ===== --> */}
				<Sidebar isMobileView={isMobileView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{/* <!-- ===== Sidebar End ===== --> */}
				{/* <!-- ===== Content Area Start ===== --> */}
				<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
					{/* <!-- ===== Header Start ===== --> */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{/* <!-- ===== Header End ===== --> */}
					{/* <!-- ===== Main Content Start ===== --> */}
					<main className={`p-4  ${sidebarOpen ? 'md:pl-[300px] lg:pl-[310px] lg:pr-6' : 'lg:pl-[110px] lg:pr-6'}`} style={{ marginBottom: '74px', minHeight: 'calc(100vh - 70px)' }}>
						{children}
					</main>
					{/* <!-- ===== Main Content End ===== --> */}
				</div>
				{/* <!-- ===== Content Area End ===== --> */}
			</div>
		</>
	)
}

export default DashboardLayout
