import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'
import List from './list'

export const metadata: Metadata = {
 title: 'Event Page ',
 //  description: 'This is Tables page for Admin Next.js',
 // other metadata
}

const Events = () => {
 return (
  <DashboardLayout>
   <List />
  </DashboardLayout>
 )
}

export default Events
