import React from "react"
import Head from "next/head"

function Contactus({ pages }) {
  console.log(pages)
  const pageslook = pages.nodes
  const contactus = pageslook.find(page => page.title === "Contact us")

  return (
    <>
      <Head>
        <title>Contact us</title>
        <meta
          name="description"
          content="يمكنك الإتصال بنا من خلال ملء الإستمارة سنحاول الرّد عليك في أقرب وقت"
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
          Contact us
        </h1>
        <div
          dir="rtl"
          className="testing"
          dangerouslySetInnerHTML={{ __html: contactus.content }}
        ></div>
      </div>
    </>
  )
}

export default Contactus

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
