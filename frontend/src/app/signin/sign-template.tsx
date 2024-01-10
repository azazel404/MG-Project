import React from 'react'
import { Metadata } from 'next'
import { Paper, TextInput, PasswordInput, Button, Title, Flex } from '@mantine/core'
import styles from './styles.module.scss'
export const metadata: Metadata = {
	title: 'Signin Page ',
	description: 'This is Signin page for Admin Next.js',
	// other metadata
}

const SignIn: React.FC = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<Paper className={styles.form} radius={0} p={30}>
					<Flex align='center' justify='center' direction={'column'} style={{ height: '100%' }}>
						<div className='w-full px-0 lg:px-[140px]'>
							<Title order={2} ta='left' mt='md' mb={20}>
								Login
							</Title>
							<TextInput label='Email address' placeholder='hello@gmail.com' size='md' />
							<PasswordInput label='Password' placeholder='Your password' mt='md' size='md' />
							<Button variant='filled' fullWidth mt='xl' size='md'>
								Login
							</Button>
						</div>
					</Flex>
				</Paper>
			</div>
		</>
	)
}

export default SignIn
