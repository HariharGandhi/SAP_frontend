import React from 'react'
import { useEffect } from 'react'
import "./Application.css"

export default function Pending() {

    
    useEffect(() => {
    
    }, [])
    
  return (
    <div>
        
        <h3>Pending</h3>
        <h5>if you have any query weite here</h5>
        <input className='Pending' type="text" />
    </div>
    
  )
}
