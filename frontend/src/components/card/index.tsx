'use client'
import React from 'react'
interface CardProps {
	title: string
	children: React.ReactNode
}

export const Card = ({ title, children }: CardProps) => {
	return (
		<div className={`container mx-auto mt-6 rounded-lg bg-white dark:border-strokedark dark:bg-boxdark min-h-[220px]`}>
			<div className='py-4 px-6 border-b-[1px] border-bodydark1'>
				<div className='flex flex-row relative items-center '>
					<div className='divider-title bg-primary'></div>
					<span className='text-black font-semibold'>{title}</span>
				</div>
			</div>
			<div className='p-6'>{children}</div>
		</div>
	)
}
