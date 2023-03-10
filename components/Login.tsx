'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'


const Login = () => {
    return (
        <div className='bg-white'>

            <div className='flex flex-col items-center justify-center h-screen space-y-10'>
                <div>
                    <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                        width={45}
                        height={45}
                        alt="logo"
                    />
                </div>
                <div>
                    <h1 className='font-bold text-3xl text-center mb-5'>Welcome Back!</h1>
                    <button onClick={() => signIn('google')}
                        className='flex items-center justify-between border border-teal-700 gap-4 py-4 px-8 text-xl hover:bg-[#e5e5e5]'
                    >
                        <Image
                            alt='Google'
                            src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                            width={20}
                            height={20}
                        />
                        Continue with Google
                    </button>

                </div>
            </div>


            {/* <Image
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                width={150}
                height={150}
                alt="logo"
            />
    */}
        </div>
    )
}

export default Login