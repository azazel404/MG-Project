import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'
import List from './list'

export const metadata: Metadata = {
	title: 'Tables Page ',
	//  description: 'This is Tables page for Admin Next.js',
	// other metadata
}

const Customers = () => {
	return (
		<DashboardLayout>
			<div className=' mx-auto max-w-screen-2xl md:p-6'>
				<List />
			</div>
		</DashboardLayout>
	)
}

export default Customers
