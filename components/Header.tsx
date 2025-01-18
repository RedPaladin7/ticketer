import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/images/logo.png'
import {SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import SearchBar from './SearchBar'

const Header = () => {
  return (
    <div className='border-b'>
        <div className='flex flex-col lg:flex-row items-center gap-4 p-4'>
            <div className='flex items-center justify-between w-full lg:w-auto'>
                <Link href='/' className='font-bold shrink-0'>
                    <Image
                    src={logo}
                    alt='logo'
                    width={100}
                    height={100}
                    className='w-24 lg:w-28'
                    />
                </Link>
                <div className='lg:hidden'>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <button className='border border-gray-300'>
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
            <div className='w-full lg:max-w-2xl'>
                <SearchBar/>
            </div>
        </div>
    </div>
  )
}

export default Header