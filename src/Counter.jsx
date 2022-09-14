import React from 'react'
import { useState } from 'react';

export default function Counter() {
    const [count, setCount]= useState(0); 

    function increment(){
        setCount((prevCount) => prevCount+1);
        console.log(count);
    }

    function decrement(){
        setCount((prevCount) => prevCount-1);
        console.log(count);
    }
    
  return (
    <div>
        <button onClick={increment}>Increment</button>
        <button  onClick={decrement}>Decrement</button>
        <p>{count}</p>
    </div>
  )
}
