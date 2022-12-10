import React from "react"
import Exercise from "./exercise"
import Head from "next/head"
import { useState, useEffect } from "react"
import HtmlTableToJson from "html-table-to-json"

const Details = ({ post }) => {
  const [table, setTable] = useState([])
  const [tableexercise, setTableexercise] = useState([])
  // const table = HtmlTableToJson.parse(html)

  // const array = table.results[0]
  useEffect(() => {
    setTable(HtmlTableToJson.parse(post.content).results[0])
  }, [])

  // ---------------getthetable---------------------------

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={`${post.title} تمارين باللغة الإنجليزية`}
        />
        <meta
          property="og:title"
          content={`${post.title} تمارين باللغة الإنجليزية`}
        />
        <meta property="og:image" content="../../public/images/exercises.png" />
      </Head>
      <div className="container w-full mx-auto flex-col flex justify-around ">
        <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
          {post.title}
        </h1>
        {table.map((item, index) => (
          <div key={index} className="w-full mb-20">
            <Exercise
              key={item.index}
              subject={item.subject}
              vertoput={item.vertoput}
              restofsentences={item.restofsentence}
              theverb={item.theverb}
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default Details

export async function getStaticPaths() {
  const allId = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
      posts(first:10000){
        nodes{
          id
          title
          slug
          excerpt
          content
        }
      }
    }`,
    }),
  })
  const res = await allId.json()
  const d = res.data.posts.nodes

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
