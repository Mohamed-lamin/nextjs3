import React from "react"

function Contactus({ pages }) {
  console.log(pages)
  const pageslook = pages.nodes
  const contactus = pageslook.find(page => page.title === "Contact us")

  return (
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
