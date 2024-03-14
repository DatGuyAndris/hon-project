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
      
          
          {session? ( <button onClick={()=>signOut('spotify', {callbackUrl: "/"})} style={styles.loginbutton}> Logout</button>) : <button onClick={()=>signIn('spotify', {callbackUrl: "/"})} style={styles.loginbutton}> Login</button>} 

         <div className='flex justify-center items-center w-full pl-40'>
          <Link href="/"> <button style={styles.button}>Your Data</button></Link> 
          <Link href="Recommendations"><button style={styles.button}>Recommendations</button> </Link> 
          <Link href="Stats"><button style={styles.button}>Random Stats</button> </Link>
          </div>
           

        
    
    </nav>
  );
};

const styles = {
   
      button: {
        
        marginLeft: '1rem',
        padding: '1rem 3rem',  // Adjusted button size

        backgroundColor: 'rgba(0, 153, 51, 0.15)',
        transition: 'background-color 0.3s ease', 
        ':hover': {
          backgroundColor: 'rgba(255, 153, 51, 0.5)'}, 
        height: '100%',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      },

      loginbutton: {
        marginLeft: '1rem',
        padding: '1rem 3rem',  // Adjusted button size
        backgroundColor: 'rgba(0, 153, 51, 0.15)',
        transition: 'background-color 0.3s ease', 
        ':hover': {
          backgroundColor: 'rgba(255, 153, 51, 0.5)'}, 
        height: '100%',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        
        

      }
};

export default Navbar;