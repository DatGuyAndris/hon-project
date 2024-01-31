import React from 'react';
import {useState} from 'react'




const TimeNavBar = ({setTimeFrame}) => {


const [timeSelected, setTimeSelected] = useState('initialValue');

const handleButtonClick = (timeSelected) => {
    // Change the value of myVariable when the button is clicked
    setTimeFrame(timeSelected);
    console.log(timeSelected)
}
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* <div style={styles.brand}>Your Logo</div> */}
        <div style={styles.buttonsContainer}>

          <button style={styles.button} onClick={() => handleButtonClick('short_term')}  >Short Term</button>

          <button style={styles.button} onClick={() => handleButtonClick('medium_term')}>Medium Term</button> 

          <button style={styles.button} onClick={() => handleButtonClick('long_term')}>Long Term</button> 
    
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
        padding: '2rem 4rem',  // Adjusted button size
        backgroundColor: 'rgba(100, 153, 51, 0.15)',
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

export default TimeNavBar;