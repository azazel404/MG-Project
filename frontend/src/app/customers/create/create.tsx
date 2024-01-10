'use client'
import React from 'react'
import Breadcrumb from '@/src/components/breadcrumbs/Breadcrumb'
import { Button, TextInput, Space, Textarea, Image, Select, NumberInput,PasswordInput } from '@mantine/core'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { CreateCustomer } from './types'
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
    {/* <Button variant='filled' leftSection={<IconPlus />} onClick={() => router.push('/customers/create')}>
     Create Customer
    </Button> */}
   </div>
   <div className='mt-6 m-h-[100px] container border rounded-lg border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark'>
    <div className='p-6'>
     <Controller name='firstName' control={control} render={({ field }) => <TextInput label='First Name' {...field} ref={field.ref} error={errors.firstName?.message} withAsterisk />} />
     <Space h='md' />
     <Controller name='lastName' control={control} render={({ field }) => <TextInput label='Last Name' {...field} ref={field.ref} error={errors.lastName?.message} withAsterisk />} />
     <Space h='xl' />
     <Controller name='email' control={control} render={({ field }) => <TextInput label='Email' {...field} ref={field.ref} error={errors.email?.message} withAsterisk />} />
     <Space h='xl' />
     <Controller name='phoneNumber' control={control} render={({ field }) => <NumberInput label='Phone Number' {...field} ref={field.ref} error={errors.phoneNumber?.message} withAsterisk />} />
     <Space h='xl' />
     <Controller name='password' control={control} render={({ field }) => <PasswordInput label='Password' {...field} ref={field.ref} error={errors.password?.message} withAsterisk />} />
     <Space h='xl' />
     <div className='flex flex-row justify-end'>
      <Button size='md' variant='outline' onClick={() => router.back()}>
       Cancel
      </Button>
      <Space w='lg' />
      <Button size='md' variant='filled' onClick={handleSubmit(handleSave)}>
       Save Customer
      </Button>
     </div>
    </div>
   </div>
  </>
 )
}
export default List
