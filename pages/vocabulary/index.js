import React, { useState, useEffect } from "react"
import HtmlTableToJson from "html-table-to-json"
import { useSpeechSynthesis } from "react-speech-kit"
import Image from "next/image"
import Link from "next/link"

function Vochome({ pages }) {
  const [html, setHtml] = useState([])
  // const [tablevocabulary, setTablevocabulary] = useState([])
  // const pageslook = pages.nodes
  // const vocabulary = pageslook.find(page => page.title === "Vocabulary")
  // const table = HtmlTableToJson.parse(html)
  console.log(html)
  // useEffect(() => {
  //   setHtml(vocabulary.content)
  // }, [vocabulary])
  // useEffect(() => {
  //   setTablevocabulary(table.results[0])
  // }, [html, table])
  const { speak } = useSpeechSynthesis()
  function talking() {
    speak({ text: "text" })
  }
  useEffect(() => {
    setHtml(
      HtmlTableToJson.parse(
        pages.nodes.find(page => page.title === "Vocabulary").content
      ).results[0]
    )
  }, [])
  return (
    <div className="container mx-auto w-12/12 md:w-9/12 " dir="rtl">
      <h1 className="text-sm md:text-xl font-bold text-center mb-10 text-blue-300">
        Vocabulary-النطق
      </h1>
      <div className="flex justify-center">
        <table className="w-full m-0">
          <thead className="bg-blue-300">
            <tr>
              <th className="text-center border-2 text-xs ">English Word</th>
              <th className="text-center  border-2 text-xs">Arabic Word</th>
              <th className="text-center  border-2 text-xs">Pronunciation</th>
            </tr>
          </thead>
          <tbody>
            {html?.map((word, index) => (
              <tr className="border-2" key={index}>
                <td className="text-center text-xs md:text-base">
                  {word.EnglishWord}
                </td>
                <td className="text-center text-xs md:text-base ">
                  {word.ArabicWord}
                </td>
                <td className="relative text-center text-xs md:text-base">
                  <button
                    className="w-full flex justify-center"
                    onClick={() => speak({ text: word.EnglishWord })}
                  >
                    <Image
                      src="/images/play.png"
                      alt="grammar"
                      width="25"
                      height="25"
                      objectFit="contain"
                      className="rounded-xl hover:border-2 "
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
// export async function getStaticProps() {
//   return {
//     props: {
//       data: lessons,
//     },
//   }
// }
export default Vochome
export async function getStaticProps() {
  const res = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
            pages {
              nodes {
                content
                title
                uri
              }
            }
          }`,
    }),
  })
  const data = await res.json()
  return {
    props: {
      pages: data.data.pages,
    },
  }
}
