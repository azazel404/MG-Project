import ECommerce from '@/src/components/Dashboard/E-commerce'
import DashboardLayout from '@/src/components/dashboardLayouts'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'AgentBersama ',
	description: 'This is Home Blog page for Admin Next.js',
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
