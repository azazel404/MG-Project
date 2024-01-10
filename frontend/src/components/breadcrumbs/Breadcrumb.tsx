// import Link from 'next/link'
interface BreadcrumbProps {
 pageName: string
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
 return (
  <div className='flex flex-col'>
   <h2 className='text-title-md2  text-black font-bold dark:text-white'>{pageName}</h2>
   {/* <nav className='mt-4'>
    <ol className='flex items-center gap-2'>
     <li>
      <Link href='/'>Dashboard /</Link>
     </li>
     <li className='font-medium text-primary'>{pageName}</li>
    </ol>
   </nav> */}
  </div>
 )
}

export default Breadcrumb
