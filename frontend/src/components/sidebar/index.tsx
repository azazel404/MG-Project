import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import SidebarLinkGroup from './SidebarLinkGroup'
import { navigation } from './constant'

type SidebarProps = {
	sidebarOpen: boolean
	setSidebarOpen: (arg: boolean) => void
	isMobileView: boolean | undefined
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobileView }: SidebarProps) => {
	//  const pathname = usePathname()
	// const [toggleSidebar, setToggleSidebar] = useState(true)
	const trigger = useRef<any>(null)
	const sidebar = useRef<any>(null)
	// let storedSidebarExpanded = 'true'
	// const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
			setSidebarOpen(false)
		}
		document.addEventListener('click', clickHandler)
		return () => document.removeEventListener('click', clickHandler)
	})

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return
			setSidebarOpen(false)
		}
		document.addEventListener('keydown', keyHandler)
		return () => document.removeEventListener('keydown', keyHandler)
	})

	useEffect(() => {
		if (isMobileView) {
			setSidebarOpen(false)
		} else {
			setSidebarOpen(true)
		}
	}, [isMobileView, setSidebarOpen])

	// useEffect(() => {
	// 	localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
	// 	if (sidebarExpanded) {
	// 		document.querySelector('body')?.classList.add('sidebar-expanded')
	// 	} else {
	// 		document.querySelector('body')?.classList.remove('sidebar-expanded')
	// 	}
	// }, [sidebarExpanded])

	return (
		<>
			{isMobileView ? (
				<div
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='z-9999 bg-white sidebar-toggle shadow-md'
					style={{
						left: sidebarOpen && isMobileView ? '266px' : '-100px',
					}}>
					<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' className='component-iconify MuiBox-root css-3o0h5k iconify iconify--eva' width='1em' height='1em' viewBox='0 0 24 24'>
						<path fill='currentColor' d='M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z'></path>
					</svg>
				</div>
			) : (
				<div
					// onClick={() => setToggleSidebar(!toggleSidebar)}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					className='z-9999 bg-white sidebar-toggle shadow-md'
					style={{
						left: sidebarOpen && !isMobileView ? '266px' : '74px',
					}}>
					<svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' aria-hidden='true' role='img' className='component-iconify MuiBox-root css-3o0h5k iconify iconify--eva' width='1em' height='1em' viewBox='0 0 24 24'>
						<path fill='currentColor' d='M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64Z'></path>
					</svg>
				</div>
			)}
			<aside ref={sidebar} className={`fixed left-0 top-0 z-99  flex h-screen  flex-col overflow-y-hidden bg-black  dark:bg-boxdark    w-[280px] ${sidebarOpen && !isMobileView ? 'lg:w-[280px]' : 'lg:w-[88px]'} lg:translate-x-0 ${sidebarOpen && isMobileView ? 'translate-x-0' : '-translate-x-full'}`}>
				{/* <!-- SIDEBAR HEADER --> */}
				<div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
					<Link href='/'>
						<div
							style={{
								width: !sidebarOpen ? '40px' : '120px',
								height: 40,
								backgroundColor: '#6d4b40',
								borderRadius: 10,
							}}></div>
					</Link>
				</div>
				{/* <!-- SIDEBAR HEADER --> */}
				<div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
					{/* <!-- Sidebar Menu --> */}
					<nav className={`mt-5 py-4 px-4 lg:mt-0 ${!sidebarOpen ? 'lg:px-2' : 'lg:px-6'}`}>
						{/* <!-- Menu Group --> */}
						<h3 className='mb-4 ml-2 text-sm font-semibold text-bodydark2'>MENU</h3>
						<ul className='mb-6 flex flex-col gap-1.5 overflow-visible'>
							{navigation.map((nav, index) => {
								return (
									<React.Fragment key={index}>
										{/* <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>{nav.section}</h3> */}
										{nav.navigation.map((item, index) => {
											return (
												<li key={index}>
													<Link href={item.path} className={`group relative flex ${!sidebarOpen ? 'flex-col justify-center items-center text-xs' : 'flex-row font-medium px-2'} '} py-2 font-medium text-bodydark1 ease-in-out hover:rounded-lg hover:bg-graydark hover:rounded-lg `}>
														{/* <div className={`flex ${!toggleSidebar ? 'flex-col justify-center' : 'flex-row'} items-center`}></div> */}
														<span className={`${!sidebarOpen ? 'pr-0' : 'pr-2'}`}>{item.icon}</span>
														<span className='text-bodydark1'>{item.title}</span>
													</Link>
												</li>
											)
										})}
									</React.Fragment>
								)
							})}
							{/* <!-- Menu Item Forms --> */}
						</ul>
					</nav>
					{/* <!-- Sidebar Menu --> */}
				</div>
			</aside>
		</>
	)
}

export default Sidebar
