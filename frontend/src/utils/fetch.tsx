import axios from 'axios'

const baseURL = `${process.env.NEXT_PUBLIC_URL_API}`
let controller: AbortController

interface IHeader {
 [key: string]: string
 data?: any
}

const instance = axios.create({
 baseURL: baseURL,
 // timeout: 5000, set timeout for 5 seconds
 headers: { 'Content-Type': 'application/json' },
})
const fetchHelper = async (url: string, options: IHeader) => {
 // if (controller) {
 // 	// Cancel the previous request before making a new request
 // 	controller.abort()
 // }
 // Create a new AbortController
 controller = new AbortController()
 const request: IHeader = {
  method: options.method,
  baseURL,
  url,
  // headers: options.headers, // set custom headers
 }

 // Add headers to the request
 if (options.headers) {
  request.headers = options.headers
 }
 // Add data to the request

 if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
  request.data = options.body
 }

 try {
  const response = await instance({ ...request, signal: controller.signal })

  if (response.status >= 200 && response.status < 400) {
   return response
  }
 } catch (error: any) {
  if (error.response) {
   // The request was made and the server responded with a status code
   // that falls out of the range of 2xx
   console.log(error.response.data)
   console.log(error.response.status)
   console.log(error.response.headers)

   if (error.response.status === 401) {
    console.error('Not authorized. Please login.')
   }
   if (error.response.status >= 500 && error.response.status < 600) {
    console.error('Server error. Please try again later.')
   }

   if (error.code === 'ECONNABORTED') {
    console.error('Timeout error:', error.message)
   }
  } else if (error.request) {
   // The request was made but no response was received
   console.log(error.request)
  } else {
   // Something happened in setting up the request that triggered an Error
   console.log('Error', error.message)
  }
  if (error.name === 'AbortError') {
   console.log('Request canceled', error.message)
  } else {
   console.error('Error:', error)
  }
  throw error
 }
}

export default fetchHelper
