'use client'
import React, { useEffect } from 'react'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import Table from '@/src/components/tables'
import DashboardLayout from '@/src/components/dashboardLayouts'
// import { Metadata } from 'next'
import DummyAPI from '@/src/api/dummy'
import { useQuery } from '@tanstack/react-query'
// export const metadata: Metadata = {
// 	title: 'Tables Page ',
// 	description: 'This is Tables page for Admin Next.js',
// 	// other metadata
// }

const TablesPage = () => {
 // const { isPending, error, data } = useQuery({
 // 	queryKey: ['PostsPlaceHolder'],
 // 	queryFn: () => DummyAPI.get({ _page: 1, _limit: 5, title: 'qui est esse' }),
 // })

 // const retrieve = async () => {
 // 	const res = await DummyAPI.get(1, 5)
 // 	console.log(res)
 // }

 // useEffect(() => {
 // 	retrieve()
 // }, [])

 return (
  <DashboardLayout>
   <Breadcrumb pageName='Tables' />
   <div className='flex flex-col gap-10'>
    <Table />
   </div>
  </DashboardLayout>
 )
}

export default TablesPage
