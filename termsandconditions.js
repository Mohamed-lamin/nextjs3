import React from "react"

function Termsandconditions({ pages }) {
  console.log(pages)
  const pageslook = pages.nodes
  const privacypolicy = pageslook.find(page => page.title === "Privacy Policy")
  console.log(privacypolicy)
  return (
    <div>
      <article
        dangerouslySetInnerHTML={{ __html: privacypolicy.content }}
      ></article>
    </div>
  )
}

export default Termsandconditions

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
