import React from "react"
import Head from "next/head"

function Privacypolicy({ pages }) {
  const pageslook = pages.nodes
  const privacypolicy = pageslook.find(page => page.title === "Privacy Policy")

  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Privacy Plicy for Perfect english for you"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        ></link>
      </Head>
      <div className="container mx-auto w-9/12 " dir="rtl">
        <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
          Privacy Policy
        </h1>
        <div
          dir="ltr"
          className="testing"
          dangerouslySetInnerHTML={{ __html: privacypolicy.content }}
        ></div>
      </div>
    </>
  )
}

export default Privacypolicy

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
