import React from 'react'

const Blob = () => {
  return (
    <>
      <div className="absolute top-32 -left-24 w-4/6 h-4/6 bg-huat-10 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob" />
      <div className="absolute top-32 -right-24 w-4/6 h-4/6 bg-huat-20 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob" />
      <div className="absolute top-72 left-32 w-4/6 h-4/6 bg-huat-30 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob" />
    </>
  )
}

export default Blob