import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'>
        <h1 className='text-2xl font-bold mb-6'>Welcome to TreeBio🌳</h1>
        <p className='text-lg mb-4 font-semibold text-gray-500'>Please sign in to continue. If you don't have an account, you can create one.</p>


        <div className='mt-6'>
            <SignUp />
        </div>
    </div>
  )
}