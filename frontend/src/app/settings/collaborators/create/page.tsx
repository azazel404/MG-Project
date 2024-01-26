import { Metadata } from 'next'
import DashboardLayout from '@/src/components/dashboardLayouts'
import Create from './create'
export const metadata: Metadata = {
 title: 'Create Customers ',
 //  description: 'This is Tables page for Admin Next.js',
 // other metadata
}

const Customers = () => {
 return (
  <DashboardLayout>
   <div className='mx-auto max-w-screen-2xl md:p-6'>
    <Create />
   </div>
  </DashboardLayout>
 )
}

export default Customers
