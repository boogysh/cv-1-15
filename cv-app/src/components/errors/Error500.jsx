import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Error500() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 200)
  }, [])
  return (
    show && (
      
      <div className="w-full h-auto flex flex-col items-center">
      <h1 className="block text-[96px] md:text-[200px] text-[--primary] font-bold leading-[130px]  md:leading-[300px] p-0 pt-[80px] md:pt-[150px]">500</h1>
      <h2 className="w-[80%] block text-center text-[18px] md:text-[36px] font-medium text-[--primary]  pb-[50px] md:pb-[80px]  ">
      Oups! Problème server!
      </h2>
      <Link to="/" className="block text-[--primary] text-[14px]  md:text-[18px] pb-[50px] md:pb-[100px] ">
        Retournez sur la page d'accueil
      </Link>
    </div>
    )
  )
}
export default Error500