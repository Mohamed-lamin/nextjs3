import Image from "next/image"
import React, { useState } from "react"

function Content({ nameEn, photo, nameAr }) {
  const [subject, setSubject] = useState(nameEn)
  const [toggle, setToggle] = useState(false)

  setTimeout(() => {
    setToggle(!toggle)

    toggle ? setSubject(nameEn) : setSubject(nameAr)
  }, 6000)

  return (
    <div className="text-center w-80 h-80  flex flex-col justify-center md:justify-around items-center rounded-xl ">
      <div className="text-center relative mb-4 md:mb-0">
        <h1 className="uppercase font-bold  text-xl md:text-3xl ">{subject}</h1>
      </div>
      <div className=" relative   h-75 flex justify-center w-75 md:w-full rounded-xl">
        <Image
          src={photo}
          alt="grammar"
          objectFit="cover"
          fill
          className="rounded-xl"
        />
      </div>
    </div>
  )
}

export default Content
