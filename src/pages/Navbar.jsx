import React from 'react';
import OtherPage from './otherpage';
import {signIn} from "next-auth/react"


const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* <div style={styles.brand}>Your Logo</div> */}
        <div style={styles.buttonsContainer}>
          <a href="/"> <button style={styles.button}>Your Data</button></a> 
          <a href="otherpage"><button style={styles.button}>Other Stuff</button> </a> 
          <button onClick={()=>signIn('spotify', {callbackUrl: "/"})} style={styles.button}> Login</button> 


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
        padding: '2rem 5rem',  // Adjusted button size
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
};

export default Navbar;