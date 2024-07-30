/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 flex justify-between items-center h-20'>
        <img src="/nirvananomads.png" alt="" className="w-36 h-auto"/>
        <div>
      <Button>Sign In</Button>
    </div>
    </div>
    
  )
}

export default Header