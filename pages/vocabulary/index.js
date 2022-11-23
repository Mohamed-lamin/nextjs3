import React, { useState, useEffect } from "react"
import HtmlTableToJson from "html-table-to-json"
import { useSpeechSynthesis } from "react-speech-kit"
import Image from "next/image"
import Link from "next/link"

function Vochome({ pages }) {
  const [html, setHtml] = useState("")
  const [tablevocabulary, setTablevocabulary] = useState([])
  const pageslook = pages.nodes
  const vocabulary = pageslook.find(page => page.title === "Vocabulary")
  const table = HtmlTableToJson.parse(html)
  console.log(html)
  useEffect(() => {
    setHtml(vocabulary.content)
  }, [vocabulary])
  useEffect(() => {
    setTablevocabulary(table.results[0])
  }, [html, table])
  const { speak } = useSpeechSynthesis()
  function talking() {
    speak({ text: "text" })
  }
  return (
    <div className="container mx-auto w-fullChromiumVersions " dir="rtl">
      <div className="vocabularyTable">
        <table className="w-full m-0">
          <thead>
            <tr>
              <th className="text-center h-20">English Word</th>
              <th className="text-center">Arabic Word</th>
              <th className="text-center">Pronunciation</th>
            </tr>
          </thead>
          <tbody>
            {tablevocabulary?.map((word, index) => (
              <tr className="" key={index}>
                <td className="text-center h-10">{word.EnglishWord}</td>
                <td className="text-center ">{word.ArabicWord}</td>
                <td className="relative text-center">
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
