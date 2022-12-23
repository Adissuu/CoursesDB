import Link from 'next/link';
import { useState } from 'react';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import nProgress from 'nprogress';

Router.onRouteChangeStart = url => nProgress.start()
Router.onRouteChangeComplete = url => nProgress.done()
Router.onRouteChangeError = url => nProgress.done()

export default function Home() {
    const [navbar, setNavbar] = useState(false);
    return (
        <div>
            <nav className="w-full bg-azur-200 shadow">
                <div className="justify-between px-4 mx-auto  md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-3 md:block">
                            <Link href="/" className={`text-5xl text-forest-100 hover:text-forest-200       
                             duration-300 tracking-widest`}>CoursesDB</Link>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray- 
                                    400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'
                                }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <Link href="/courses" className='text-2xl content-center text-white hover:text-forest-200 duration-300'>
                                    Courses
                                </Link>
                                {!isAuth() && (
                                    <>
                                        <li className="text-white">
                                            <Link href="/signin" className='text-2xl content-center text-white hover:text-forest-200 duration-300'>
                                                Sign In
                                            </Link>
                                        </li>
                                        <li className="text-white">
                                            <Link href="/signup" className='btn bg-forest-100 p-1 text-2xl content-center rounded-md text-white hover:bg-forest-200 duration-300'>
                                                Sign Up
                                            </Link>
                                        </li>
                                    </>)}
                                {isAuth() && isAuth().role == 0 && (
                                    <Link href="/user" className='text-2xl content-center text-white hover:text-forest-200 duration-300'>
                                        {`${isAuth().name}'s Dashboard`}
                                    </Link>
                                )}
                                {isAuth() && isAuth().role == 1 && (
                                    <Link href="/admin" className='text-2xl content-center text-white hover:text-forest-200 duration-300'>
                                        Admin
                                    </Link>
                                )}
                                {isAuth() && (
                                    <a className='btn bg-forest-100 p-1 text-2xl content-center rounded-md text-white hover:bg-forest-200 duration-300 cursor-pointer' onClick={() => signout(() => Router.replace('/signin'))}>
                                        Signout
                                    </a>
                                )}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
}
