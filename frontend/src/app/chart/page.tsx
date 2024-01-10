import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import ChartFour from '@/src/components/Charts/ChartFour'
import ChartOne from '@/src/components/Charts/ChartOne'
import ChartThree from '@/src/components/Charts/ChartThree'
import ChartTwo from '@/src/components/Charts/ChartTwo'
import { Metadata } from 'next'
export const metadata: Metadata = {
 title: 'Chart Page ',
 description: 'This is Chart Page for Admin Next.js',
 // other metadata
}

const Chart = () => {
 return (
  <>
   <Breadcrumb pageName='Chart' />

   <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
    <div className='col-span-12'>
     <ChartFour />
    </div>
    <ChartOne />
    <ChartTwo />
    <ChartThree />
    <ChartOne />
    <ChartTwo />
    <ChartThree />
    <ChartOne />
    <ChartTwo />
    <ChartThree />
   </div>
  </>
 )
}

export default Chart
