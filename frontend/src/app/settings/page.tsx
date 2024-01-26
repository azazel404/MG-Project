import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import { IconUserCog, IconId } from '@tabler/icons-react'
import { Button } from '@mantine/core'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Settings Page ',
	//  description: 'This is Tables page for Admin Next.js',
	// other metadata
}

const Customers = () => {
	return (
		<DashboardLayout>
			<div className=' mx-auto max-w-screen-2xl md:p-6'>
				<div className='flex flex-row justify-between items-center'>
					<Breadcrumb pageName='Settings' />
				</div>
				<div className='mt-6'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
						<div className='rounded-sm  bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
							<div className='flex'>
								<div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
									<IconUserCog />
								</div>
							</div>
							<div className='mt-2'>
								<h4 className='text-title-sm font-medium text-black dark:text-white'>Collaborators</h4>
								<span className='text-xs '>Manage access Collaborators</span>
							</div>
							<div className='mt-4 flex items-end justify-start'>
								<Link href={'/settings/collaborators'}>
									<Button variant='light'>View</Button>
								</Link>
							</div>
						</div>
						<div className='rounded-sm  bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
							<div className='flex'>
								<div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
									<IconId />
								</div>
							</div>
							<div className='mt-2'>
								<h4 className='text-title-sm font-medium text-black dark:text-white'>Company Profile</h4>
								<span className='text-xs'>Basic information about a company</span>
							</div>
							<div className='mt-4 flex items-end justify-start'>
								<Button variant='light'>View</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardLayout>
	)
}

export default Customers
