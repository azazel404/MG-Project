'use client'
import React from 'react'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import { Button, TextInput, Space, Textarea, Select, NumberInput, PasswordInput } from '@mantine/core'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Card } from '@/src/components/card'
import { CreateCollaborator } from './types'

const List = () => {
	const router = useRouter()

	const schema = yup.object().shape({
		firstName: yup.string().required(`First Name is required`),
		lastName: yup.string().required(`Last Name is required`),
		email: yup.string().email().required(`Email is required`),
		phoneNumber: yup.string().required(`Phone Number is required`),
		password: yup.string().required(`Phone Number is required`),
		role: yup.string().required(`Role Number is required`),
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCollaborator>({
		resolver: yupResolver(schema),
	})

	const handleSave: SubmitHandler<CreateCollaborator> = (values: CreateCollaborator) => {
		console.log(values)
	}

	return (
		<>
			<div className='flex flex-row justify-between items-center'>
				<Breadcrumb pageName='Create Collaborator' />
			</div>
			<div className='grid grid-cols-1'>
				<div className='col-span-2'>
					<Card title='Information'>
						<Controller name='firstName' control={control} render={({ field }) => <TextInput label='First Name' {...field} ref={field.ref} error={errors.firstName?.message} withAsterisk />} />
						<Space h='md' />
						<Controller name='lastName' control={control} render={({ field }) => <TextInput label='Last Name' {...field} ref={field.ref} error={errors.lastName?.message} withAsterisk />} />
						<Space h='md' />
						<Controller name='email' control={control} render={({ field }) => <TextInput label='Email' {...field} ref={field.ref} error={errors.email?.message} withAsterisk />} />
						<Space h='md' />
						<Controller name='phoneNumber' control={control} render={({ field }) => <NumberInput label='Phone Number' {...field} ref={field.ref} error={errors.phoneNumber?.message} withAsterisk />} />
						<Space h='md' />
						<Controller name='password' control={control} render={({ field }) => <PasswordInput label='Password' {...field} ref={field.ref} error={errors.password?.message} withAsterisk />} />
						<Space h='md' />
						<Controller
							name='role'
							control={control}
							render={({ field }) => (
								<Select
									label='Role'
									clearable
									searchable
									{...field}
									data={[]}
									onChange={(event) => {
										field.onChange(event)
									}}
									ref={field.ref}
									error={errors.role?.message}
									withAsterisk
								/>
							)}
						/>
						<Space h='xl' />
						<div className='flex flex-row justify-end'>
							<Button variant='light' onClick={() => router.back()}>
								Cancel
							</Button>
							<Space w='lg' />
							<Button variant='filled' onClick={handleSubmit(handleSave)}>
								Save Collaborator
							</Button>
						</div>
					</Card>
					{/* <Card title='Address Information'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<Controller
								name='city'
								control={control}
								render={({ field }) => (
									<Select
										label='City'
										clearable
										searchable
										{...field}
										data={[]}
										onChange={(event) => {
											field.onChange(event)
										}}
										ref={field.ref}
										error={errors.city?.message}
									/>
								)}
							/>
							<Controller
								name='state'
								control={control}
								render={({ field }) => (
									<Select
										label='State'
										clearable
										searchable
										{...field}
										data={[]}
										onChange={(event) => {
											field.onChange(event)
										}}
										ref={field.ref}
										error={errors.city?.message}
									/>
								)}
							/>
							<Controller name='zipCode' control={control} render={({ field }) => <TextInput label='Postal Code' {...field} ref={field.ref} error={errors.zipCode?.message} />} />
						</div>
						<Space h='md' />
						<Controller name='address' control={control} render={({ field }) => <Textarea label='Address' {...field} ref={field.ref} error={errors.address?.message} />} />
						<Space h='xl' />
					</Card> */}
				</div>
			</div>
		</>
	)
}
export default List
