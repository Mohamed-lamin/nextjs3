import React from "react"

const Otherdetails = data => {
  const post = data.post

  return (
    <div className="container mx-auto w-9/12 " dir="rtl">
      <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
        {post.title}
      </h1>
      <div
        className="testing"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
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
