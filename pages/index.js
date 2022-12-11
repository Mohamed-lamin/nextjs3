import Head from "next/head"
import React from "react"
import Link from "next/link"
import Script from "next/script"
import Writing from "../components/writing"
import Content from "../components/content"
import ListofcontentItems from "../public/ListofcontentItems"
import { useState, useEffect } from "react"

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Perfect English For You تعلم اللغة الإنجليزية</title>
        <meta
          name="description"
          content="تعلّم اللغة الإنجليزية للمبتدئين و المتقدمين في اللغة الإنجليزية, مجموعة قيّمة من التمارين, و المحادثات اللتي ستثري رصيدك اللغوي الإنجليزي"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
      </Head>

      <main className=" w-100 sm:h-screen md:container md:mx-auto flex justify-sart  items-center flex-col  ">
        <div className="mt-20 md:mt-10 ">
          <Writing />
        </div>

        <div className="   md:flex  md:flex-wrap md:justify-center ">
          {ListofcontentItems.map((item, index) => (
            <div className="  m-2" key={index}>
              <Link href={item.Link}>
                <Content
                  nameEn={item.nameEn}
                  nameAr={item.nameAr}
                  photo={item.photo}
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
