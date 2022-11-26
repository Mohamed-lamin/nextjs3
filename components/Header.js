import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Humberguer from "./humberguer"
import iconfalse from "../public/images/logo.png"

function Header() {
  const [toggle, setToggle] = useState(false)
  return (
    <div className=" w-full sm:h-18 md:h-20 flex md:container md:mx-auto ">
      <header className="  w-full w-100 flex items-center ">
        <div className=" relative  w-100  flex items-center justify-start flex-row-reverse">
          <div className="h-100 ml-5 mt-2">
            {!toggle && <Humberguer setToggle={() => setToggle(!toggle)} />}
          </div>
          <div className="relative w-16 h-14 flex  hidden md:block ">
            <Link href="/">
              <Image
                src={iconfalse}
                alt=""
                objectFit="cover"
                fill
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="flex w-full items-center  justify-start hidden sm:block">
            <ul className="  flex grow sm:flex-row  ">
              <li className="hover:underline ">
                <Link href="/grammar">
                  <h2 className="nav-link text-blue-400 hover:text-blue-400 font-normal hover:font-bold">
                    قواعد اللغة الانجليزية
                  </h2>
                </Link>
              </li>

              <li className=" hover:underline">
                <Link href="/exercises">
                  <h2
                    className="nav-link text-blue-400 hover:text-blue-400 font-normal hover:font-bold"
                    href="#sports"
                    id="sport"
                  >
                    تمارين
                  </h2>
                </Link>
              </li>
              <li className=" hover:underline  ">
                <Link href="/vocabulary">
                  <h2 className="nav-link text-blue-400 hover:text-blue-400 font-normal hover:font-bold">
                    كلمات مفيدة
                  </h2>
                </Link>
              </li>
              <li className="nav-item hover:underline ">
                <Link href="/conversation">
                  <h2 className="nav-link text-blue-400 hover:text-blue-400 font-normal hover:font-bold">
                    محادثات
                  </h2>
                </Link>
              </li>
            </ul>
          </div>
          {toggle && (
            <div className=" inset-x-0 w-full flex justify-start z-50 ml-3  ">
              <div className="">
                <span className="mr-2" onClick={() => setToggle(false)}>
                  X
                </span>
              </div>
              <ul className="grow flex flex-col items-center ">
                <li className="nav-item  ">
                  <Link href="/grammar" onClick={() => setToggle(false)}>
                    <h2 className="nav-link"> قواعد اللغة الانجليزية</h2>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/exercises" onClick={() => setToggle(false)}>
                    <h2 className="nav-link"> تمارين</h2>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/vocabulary" onClick={() => setToggle(false)}>
                    <h2 className="nav-link" href="#sports" id="sport">
                      كلمات مفيدة
                    </h2>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/conversation" onClick={() => setToggle(false)}>
                    <h2
                      className="nav-link"
                      aria-current="page"
                      href="#tehnology"
                      id="technology"
                    >
                      محادثات
                    </h2>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
