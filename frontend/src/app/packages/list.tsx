'use client'
import React from 'react'
import Table from '@/src/components/tables'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import { Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const List = () => {
	const router = useRouter()
	return (
		<>
			<div className='flex flex-row justify-between items-center'>
				<Breadcrumb pageName='Packages' />
				<Button variant='filled' leftSection={<IconPlus />} onClick={() => router.push('/customers/create')}>
					Create Package
				</Button>
			</div>
			<div className='flex flex-col mt-6'>
				<Table />
			</div>
		</>
	)
}
export default List
