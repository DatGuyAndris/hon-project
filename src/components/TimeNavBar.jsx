import React from 'react';
import {useState} from 'react'




const TimeNavBar = ({setTimeFrame}) => {

const handleButtonClick = (timeSelected) => {
    // Change the value of the time frame when the button is clicked
    setTimeFrame(timeSelected);
   // console.log(timeSelected)
}
  return (
  
      <div className='w-full items-center text-center flex-row justify-center '>
        
          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56 hover:bg-green-600' onClick={() => handleButtonClick('short_term')}  >Short Term {"(4 Weeks)"}</button>

          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56 hover:bg-green-600' onClick={() => handleButtonClick('medium_term')}>Medium Term {"(6 Months)"}</button> 

          <button className='bg-green-800 h-10 rounded-sm px-1 mx-1 w-56 hover:bg-green-600' onClick={() => handleButtonClick('long_term')}>Long Term </button> 
    
        </div>
    
    

    
  );
  
};


export default TimeNavBar;