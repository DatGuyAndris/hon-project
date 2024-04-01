'use client'

import { db } from '@/lib/firebase';
import { addDoc, collection,getDocs, deleteDoc} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import LineChartRanks from './LineChartRanks';



export const TestingDB = () => {
  
const TestCollectionRef = collection(db,"ArtistRankings")

const [dbStat, setDBStat] = useState([])

const  [name, setName] = useState()

useEffect(() => {
  const getTest = async () => {
    //const q = await getDocs(TestCollectionRef);
    
    //setName(q.docs)
    await getDocs(TestCollectionRef)
    .then((snapshot)=>{               
        const newData = snapshot.docs.map((doc) => ({...doc.data(), id:doc.id })).sort((a, b) => a.updated - b.updated);

        setName(newData);             
    })
  }; 
  getTest();
}, []);

console.log("q",name)

const handleSave = async () => {

  const newData = await addDoc(collection(db,"test"), {
    age: 5423,
    name :"aaami",
    field: "mud",
    sky:"glue"

  })


  console.log("newdata",newData.id)
}

const deleteAll = async () => {

  const snapshot = await getDocs(TestCollectionRef);
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};


  return (
    <div>
      ayyy
      <button className='p-4 bg-green-400' onClick={handleSave}> Save </button>
      <button className='p-4 bg-red-700' onClick={deleteAll}> DELETE </button>
      {/* {name?.map((stat) => {
              console.log("stat", stat)
              return(<div> {stat.updated} </div>)
            })} */}
            {name? (<LineChartRanks dbDataforGraph={name}/>) : null}
            
    </div>
  );
};

export default TestingDB;