'use client'
import React from 'react'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import { Button, TextInput, Space, Textarea, Select, NumberInput, PasswordInput } from '@mantine/core'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Card } from '@/src/components/card'
import { CreateCustomer } from './types'
import { UploadAvatar } from '@/src/components/uploadAvatar'

const List = () => {
	const router = useRouter()

	const schema = yup.object().shape({
		firstName: yup.string().required(`First Name is required`),
		lastName: yup.string().required(`Last Name is required`),
		email: yup.string().email().required(`Email is required`),
		phoneNumber: yup.string().required(`Phone Number is required`),
		password: yup.string().required(`Phone Number is required`),
		// address: yup.string().required(`Address is required`),
		// city: yup.string().required(`City is required`),
		// state: yup.string().required(`State is required`),
		// zip: yup.string().required(`Zip is required`),
		// country: yup.string().required(`Country is required`),
		// notes: yup.string().required(`Notes is required`),
		// tags: yup.string().required(`Tags is required`),
		// avatar: yup.string().required(`Avatar is required`),
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCustomer>({
		resolver: yupResolver(schema),
	})

	const handleSave: SubmitHandler<CreateCustomer> = (values: CreateCustomer) => {
		console.log(values)
	}

	return (
		<>
			<div className='flex flex-row justify-between items-center'>
				<Breadcrumb pageName='Create Customer' />
				<div className='flex flex-row justify-end'>
					<Button variant='light' onClick={() => router.back()}>
						Cancel
					</Button>
					<Space w='lg' />
					<Button variant='filled' onClick={handleSubmit(handleSave)}>
						Save Customer
					</Button>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div>
					<Card title='Avatar'>
						<div className='flex flex-col justify-center items-center'>
							<UploadAvatar />
							<div className='text-center flex flex-col mt-5'>
								<span className='text-bodydark'>Allowed *.jpeg, *.jpg, *.png</span>
								<span className='text-bodydark'>max size of 3 Mb</span>
							</div>
						</div>
					</Card>
				</div>
				<div className='col-span-2'>
					<Card title='General Information'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Controller name='firstName' control={control} render={({ field }) => <TextInput label='First Name' {...field} ref={field.ref} error={errors.firstName?.message} withAsterisk />} />
							<Controller name='lastName' control={control} render={({ field }) => <TextInput label='Last Name' {...field} ref={field.ref} error={errors.lastName?.message} withAsterisk />} />
						</div>
						<Space h='md' />
						<div className='grid grid-cols-2 gap-4'>
							<Controller name='email' control={control} render={({ field }) => <TextInput label='Email' {...field} ref={field.ref} error={errors.email?.message} withAsterisk />} />
							<Controller name='phoneNumber' control={control} render={({ field }) => <NumberInput label='Phone Number' {...field} ref={field.ref} error={errors.phoneNumber?.message} withAsterisk />} />
						</div>
						<Space h='md' />
						<Controller name='password' control={control} render={({ field }) => <PasswordInput label='Password' {...field} ref={field.ref} error={errors.password?.message} withAsterisk />} />
						<Space h='xl' />
					</Card>
					<Card title='Address Information'>
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
					</Card>
				</div>
			</div>
		</>
	)
}
export default List
