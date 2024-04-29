import React from 'react';
import {useState} from 'react'




const TimeNavBar = ({setTimeFrame}) => {



const handleButtonClick = (timeSelected) => {
    // Change the value of myVariable when the button is clicked
    setTimeFrame(timeSelected);
   // console.log(timeSelected)
}
  return (
  
      <div className='w-full items-center text-center flex-row justify-center '>
        {/* <div style={styles.brand}>Your Logo</div> */}
        
        
          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56' onClick={() => handleButtonClick('short_term')}  >Short Term {"(4 Weeks)"}</button>

          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56' onClick={() => handleButtonClick('medium_term')}>Medium Term {"(6 Months)"}</button> 

          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56' onClick={() => handleButtonClick('long_term')}>Long Term </button> 
    
        </div>
    
    

    
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
        padding: '1rem 4rem',  // Adjusted button size
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