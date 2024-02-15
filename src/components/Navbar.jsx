import React from 'react';
import OtherPage from '../pages/randomstats';
import {signIn} from "next-auth/react"
import Link from 'next/link';
import { useSession } from "next-auth/react";


const Navbar = () => {

  const { data: session } = useSession();

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* <div style={styles.brand}>Your Logo</div> */}
        <div style={styles.buttonsContainer}>
          <Link href="/"> <button style={styles.button}>Your Data</button></Link> 
          <Link href="Recommendations"><button style={styles.button}>Recommendations</button> </Link> 
          <Link href="randomstats"><button style={styles.button}>Random Stats</button> </Link> 
          <div className='float-right'>
          {session? ( <button onClick={()=>signIn('spotify', {callbackUrl: "/"})} style={styles.loginbutton}> Logout</button>) : <button onClick={()=>signIn('spotify', {callbackUrl: "/"})} style={styles.loginbutton}> Login</button>} </div>
          


        </div>
      </div>
    </nav>
  );
};

const styles = {
    navbar: {
        backgroundColor: 'rgba(0, 153, 51, 0.05)',
        
        color: '#fff',
        padding: '0rem',
        width: '100%',
      },
      container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '100vw',
        margin: '0 auto',
      },
      buttonsContainer: {
        display: 'flex',
        flex: 1,
        justifyContent:'center',
      },
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