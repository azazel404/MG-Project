import ECommerce from '@/src/components/Dashboard/E-commerce'
import DashboardLayout from '@/src/components/dashboardLayouts'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'MG ',
	// other metadata
}

export default function Dashboard() {
	return (
		<DashboardLayout>
			<>
				<ECommerce />
			</>
		</DashboardLayout>
	)
}
