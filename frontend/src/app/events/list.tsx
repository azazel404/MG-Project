'use client'
import React from 'react'
import Table from '@/src/components/tables'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'

const List = () => {
 return (
  <>
   {' '}
   <Breadcrumb pageName='Events' />
   <div className='flex flex-col gap-10'>
    <Table />
   </div>
  </>
 )
}
export default List
