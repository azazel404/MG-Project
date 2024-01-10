'use client'
import React from 'react'
import { Package } from '@/src/types/package'
import { TextInput, Button, NativeSelect, Menu } from '@mantine/core'
import { IconChevronLeft, IconChevronRight, IconDotsVertical, IconTrash, IconEdit } from '@tabler/icons-react'

const data: Package[] = [
 {
  name: 'Free package',
  price: 0.0,
  invoiceDate: `Jan 13,2023`,
  status: 'Paid',
 },
 {
  name: 'Standard Package',
  price: 59.0,
  invoiceDate: `Jan 13,2023`,
  status: 'Paid',
 },
 {
  name: 'Business Package',
  price: 99.0,
  invoiceDate: `Jan 13,2023`,
  status: 'Unpaid',
 },
 {
  name: 'Standard Package',
  price: 59.0,
  invoiceDate: `Jan 13,2023`,
  status: 'Pending',
 },
 {
  name: 'Standard Package',
  price: 59.0,
  invoiceDate: `Jan 13,2023`,
  status: 'Pending',
 },
]

const TableThree = () => {
 return (
  <div className='border rounded-lg border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark'>
   <div className='flex flex-row p-4'>
    <div className='pe-4'>
     <TextInput size='md' label='Search' placeholder='Search' description='Description below the input' inputWrapperOrder={['label', 'input']} />
    </div>
   </div>
   <div className='max-w-full overflow-x-auto'>
    <table className='w-full table-auto'>
     <thead>
      <tr className='bg-gray-2 text-left dark:bg-meta-4'>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>Package</th>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white'>Invoice date</th>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white'>Invoice date 1</th>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white'>Invoice date 2</th>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white'>Invoice date 3</th>
       <th className='max-w-[100px] text-sm py-4 px-4 font-medium text-black dark:text-white'>Status</th>
       <th className='w-[70px] text-sm py-4 px-4 font-medium text-black dark:text-white'></th>
      </tr>
     </thead>
     <tbody>
      {data.map((packageItem, key) => (
       <tr key={key}>
        <td className='border-b border-[#eee] py-3 px-4 pl-9 dark:border-strokedark xl:pl-11'>
         <p className='font-medium text-black dark:text-white'>{packageItem.name}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <p className='text-black dark:text-white'>{packageItem.invoiceDate}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <p className='text-black dark:text-white'>{packageItem.invoiceDate}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <p className='text-black dark:text-white'>{packageItem.invoiceDate}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <p className='text-black dark:text-white'>{packageItem.invoiceDate}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${packageItem.status === 'Paid' ? 'text-success bg-success' : packageItem.status === 'Unpaid' ? 'text-danger bg-danger' : 'text-warning bg-warning'}`}>{packageItem.status}</p>
        </td>
        <td className='border-b border-[#eee] py-3 px-4 dark:border-strokedark'>
         <Menu position='left' offset={1} withArrow arrowPosition='center'>
          <Menu.Target>
           <Button variant='transparent' style={{ padding: '8px', borderRadius: '50%' }}>
            <IconDotsVertical className='icon-gray' />
           </Button>
          </Menu.Target>
          <Menu.Dropdown>
           <Menu.Item style={{ color: '#C92A2A' }} leftSection={<IconTrash style={{ width: '14px', height: '14px' }} />}>
            Delete
           </Menu.Item>
           <Menu.Item leftSection={<IconEdit style={{ width: '14px', height: '14px' }} />}>Edit</Menu.Item>
          </Menu.Dropdown>
         </Menu>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
   <div className='flex flex-col md:flex-row px-4 py-5  justify-between items-center'>
    <div className='invisible md:visible  flex items-center justify-center '>
     <span className='text-sm'>Rows per page</span>
     <div className='ps-3 '>
      <NativeSelect style={{ width: '60px' }} size='xs' radius='md' data={['5', '10', '15']} />
     </div>
    </div>

    <div className='flex items-center justify-center mt-[-20px] md:mt-[0px] '>
     <span className='text-sm'>Showing 1 to 10 of 97 results</span>
     <div className='ps-3 flex items-center justify-center'>
      <Button variant='transparent' size='compact-xs' radius='xs'>
       <IconChevronLeft className='icon-gray' />
      </Button>
      <Button variant='transparent' size='compact-xs' radius='xs'>
       <IconChevronRight className='icon-gray' />
      </Button>
     </div>
    </div>
   </div>
  </div>
 )
}

export default TableThree
