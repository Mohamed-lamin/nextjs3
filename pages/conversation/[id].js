import React, { useState, useEffect } from "react"
import Image from "next/image"
import HtmlTableToJson from "html-table-to-json"
import { useSpeechSynthesis } from "react-speech-kit"

const Otherdetails = ({ post }) => {
  const [html, setHtml] = useState([])

  const { speak } = useSpeechSynthesis()
  function talking() {
    speak({ text: "text" })
  }
  useEffect(() => {
    setHtml(HtmlTableToJson.parse(post.content).results[0])
  }, [])

  return (
    <div className="container  mx-auto  w-9/12 " dir="rtl">
      <h1 className="text-sm md:text-xl font-bold text-center mb-10 text-blue-300">
        {post.title}
      </h1>
      <div className="flex justify-center">
        <table className="w-full m-0">
          <thead className="bg-blue-300">
            <tr>
              <th className="text-center border-2 text-xs h-20">
                Character الشخصية
              </th>
              <th className="text-center border-2 text-xs">Arabic العربية</th>
              <th className="text-center border-2 text-xs">
                English الإنجليزية
              </th>
              <th className="text-center border-2 text-xs">Listening إستماع</th>
            </tr>
          </thead>
          <tbody>
            {html?.map((word, index) => (
              <tr className="border-2" key={index}>
                <td className="text-right md:text-center text-xs md:text-base  h-10">
                  {word.Character}
                </td>
                <td className="text-right md:text-center text-xs md:text-base ">
                  {word.Arabic}
                </td>
                <td
                  className="text-right md:text-center text-xs md:text-base "
                  dir="ltr"
                >
                  {word.English}
                </td>
                <td className="relative text-right md:text-center text-xs md:text-base ">
                  <button
                    className="w-full flex justify-center "
                    onClick={() => speak({ text: word.English })}
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

export default Otherdetails

export async function getStaticPaths() {
  const allId = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        categories(where: {slug: "conversations"}) {
          nodes {
            name
            posts {
              nodes {
                id
                title
                content
              }
            }
          }
        }
      }`,
    }),
  })
  const res = await allId.json()
  const d = res.data.categories.nodes[0].posts.nodes

  const paths = d.map(path => {
    return {
      params: { id: path.id },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const posts = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query ($id:ID!, $idType:PostIdType!){
      post(id:$id,idType:$idType){
          id
          title
          slug
          excerpt
          content
          
      }
    }`,
      variables: {
        id: context.params.id,
        idType: "ID",
      },
    }),
  })
  const res = await posts.json()
  return {
    props: {
      post: res.data.post,
    },
  }
}
