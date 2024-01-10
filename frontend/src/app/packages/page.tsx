import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'
import List from './list'

export const metadata: Metadata = {
 title: 'Package Page ',
 //  description: 'This is Tables page for Admin Next.js',
 // other metadata
}

const Packages = () => {
 return (
  <DashboardLayout>
   <List />
  </DashboardLayout>
 )
}

export default Packages
