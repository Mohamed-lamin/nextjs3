import React from "react"
import Link from "next/link"
function Title({ name, id }) {
  return (
    <div>
      <div>
        <ul className=" mr-14 md:mr-20 list-disc">
          <li className="m-1">
            <Link href={"/exercises/" + id}>
              <div className=" hover:underline decoration-sky-600 text-sky-500">
                <div className="flex">
                  <div className="mr-4 ml-4 ">
                    <h2 className="text-xs md:text-sm ">{name}</h2>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Title
