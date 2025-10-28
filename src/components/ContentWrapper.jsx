import React from 'react'

export default function ContentWrapper({children}) {
  return (
    <div className='max-w-[1440px] mx-auto'>
      {children}
    </div>
  )
}
