import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const{data:session} = useSession()
  // console.log(session.user.accessToken)
  return (
    <main
      className=""
    >
      <div> aaaa</div>
      
    </main>
  )
}
