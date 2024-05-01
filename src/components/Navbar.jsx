import React from 'react';
import OtherPage from '../pages/Stats';
import {signIn,signOut} from "next-auth/react"
import Link from 'next/link';
import { useSession } from "next-auth/react";


const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav className='flex w-full flex-row-reverse'>
      
        {/* <div style={styles.brand}>Your Logo</div> */}
      
          
          {session? ( <button onClick={()=>signOut('spotify', {callbackUrl: "/"})} className='bg-green-900 h-12 rounded-sm px-1 text-l mx-1 w-40 hover:bg-green-700'> Logout</button>) : <button onClick={()=>signIn('spotify', {callbackUrl: "/"})}> Login</button>} 

         <div className='flex justify-center items-center w-full pl-40 bg-gradient-to-r from-transparent via-neutral-800'>
          <Link href="/"> <button className='bg-green-900 h-12 rounded-sm px-1 text-xl mx-1 w-64 hover:bg-green-700'>Your Data</button></Link> 
          <Link href="Recommendations"><button className='bg-green-900 h-12 rounded-sm px-1 text-xl mx-1 w-64 hover:bg-green-700'>Recommendations</button> </Link> 
          <Link href="Stats"><button className='bg-green-900 h-12 rounded-sm px-1 text-xl mx-1 w-64 hover:bg-green-700'>Random Stats</button> </Link>
          </div>
           

        
    
    </nav>
  );
};


export default Navbar;