'use client'

import { db } from '@/lib/firebase';
import { addDoc, collection,getDocs, deleteDoc, where, query} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import LineChartRanks from './LineChartRanks';
import { useSession } from "next-auth/react";



export const TestingDB = () => {
  
const TestCollectionRef = collection(db,"ArtistRankings")

const{data:session} = useSession()
const [dbStat, setDBStat] = useState([])

const  [name, setName] = useState([])


useEffect(() => {
  const getTest = async () => {
    //const q = await getDocs(TestCollectionRef);
    
    //setName(q.docs)
    await getDocs(query(TestCollectionRef, where("userID", "==", session.user.email)))
    .then((snapshot)=>{               
        const newData = snapshot.docs.map((doc) => ({...doc.data(), id:doc.id })).sort((a, b) => a.updated - b.updated);

        setName(newData);             
    })
  }; 
  getTest();
}, []);



// const handleSave = async () => {

//   const newData = await addDoc(collection(db,"test"), {
//     age: 5423,
//     name :"aaami",
//     field: "mud",
//     sky:"glue"

//   })


// }

const deleteAll = async () => {

  const snapshot = await getDocs(TestCollectionRef);
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};


  return (
    <div>
      {/* ayyy
      <button className='p-4 bg-green-400' onClick={handleSave}> Save </button>
      <button className='p-4 bg-red-700' onClick={deleteAll}> DELETE </button> */}
      {/* {name?.map((stat) => {
              console.log("stat", stat)
              return(<div> {stat.updated} </div>)
            })} */}
            {name?.length > 0 ?  (<LineChartRanks dbDataforGraph={name}/>) : <p>No data for you</p>}
            
    </div>
  );
};

export default TestingDB;