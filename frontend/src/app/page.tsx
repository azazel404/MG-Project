import React from 'react'
import { Metadata } from 'next'
import { TextInput, PasswordInput, Paper, Title, Container, Button } from '@mantine/core'
export const metadata: Metadata = {
 title: 'Signin Page ',
 description: 'This is Signin page for Admin Next.js',
 // other metadata
}

const SignIn: React.FC = () => {
 return (
  <>
   <div className='h-full flex justify-center items-center'>
    <div className='w-full'>
     <Container size={450}>
      <Title ta='center'>Login</Title>
      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
       <TextInput label='Email' placeholder='you@email.com' required />
       <PasswordInput label='Password' placeholder='Your password' required mt='md' />
       <Button fullWidth mt='xl'>
        Sign in
       </Button>
      </Paper>
     </Container>
    </div>
   </div>
  </>
 )
}

export default SignIn
