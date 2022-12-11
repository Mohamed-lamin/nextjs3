import { useState } from "react"
import Image from "next/image"
import Head from "next/head"
import icontrue from "../../public/images/icontrue.png"
import iconfalse from "../../public/images/iconfalse.png"
function Exercise({ key, subject, vertoput, restofsentences, theverb }) {
  const [sh, setSh] = useState("")
  const [shtr, setShtr] = useState("")
  const [res, setRes] = useState("")
  const [test, setTest] = useState("")

  function check(res) {
    res !== vertoput
      ? setShtr(true) & setSh(false)
      : setShtr(false) & setSh(true)
  }

  return (
    <div className="w-full ">
      <div key={key}>
        <div className="w-full flex justify-around flex-row-reverse items-center my-2">
          <span>{subject}</span>
          <span></span>
          <div className="flex flex-col items-center">
            <span>{test}</span>
            <span className="">
              <input
                className="border-2 border-blue-300 rounded text-center"
                onChange={
                  test || sh || shtr
                    ? e => setTest("") & setSh(false) & setShtr(false)
                    : e => setRes(e.target.value)
                }
              />
              <span className="mr-2">{theverb}</span>
            </span>
          </div>

          <div>
            {sh && (
              <span>
                <Image src={icontrue} alt="" width="30" height="30" />
              </span>
            )}
            {shtr && (
              <span>
                <Image src={iconfalse} alt="" width="30" height="30" />
              </span>
            )}
          </div>

          <span>{restofsentences}</span>
          <div className=" h-24 flex w-14 flex-col justify-between items-stretch">
            <button
              className="bg-blue-300 w-full rounded-full hover:bg-white hover:border-2 hover:border-blue-300  "
              onClick={() => check(res)}
            >
              Check
            </button>
            <button
              className="bg-blue-300 w-full rounded-full hover:bg-white hover:border-2 hover:border-blue-300  "
              onClick={() => setTest(vertoput)}
            >
              Show
            </button>
          </div>
        </div>
        <div className="bg-gray-400 w-full h-0.5"></div>
      </div>
    </div>
  )
}

export default Exercise
