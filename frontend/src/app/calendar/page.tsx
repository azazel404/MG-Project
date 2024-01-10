import Calendar from '@/src/components/Calender'
import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'

export const metadata: Metadata = {
	title: 'Calendar Page ',
	description: 'This is Calendar page for Admin Next.js',
	// other metadata
}

const CalendarPage = () => {
	return (
		<DashboardLayout>
			<>
				<Calendar />
			</>
		</DashboardLayout>
	)
}

export default CalendarPage
