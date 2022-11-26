import React from "react"
import Link from "next/link"

// let use = []
function Vochome({ categories }) {
  return (
    <div className="container px-0 mx-auto w-11/12 " dir="rtl">
      <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
        Grammar - النحو
      </h1>
      <div>
        {categories.map((item, index) => (
          <div key={index}>
            <div className="flex mb-2 mt-6">
              <div className="text-xs md:text-lg md:mr-4 md:ml-4 font-bold">
                <h2>{item.name}</h2>
              </div>
            </div>
            {item.posts.nodes.map((p, index) => (
              <div key={item.posts.nodes.id}>
                <ul className="text-xs md:text-base md:mr-14 list-disc">
                  <li className="m-1">
                    <Link href={"/grammar/" + p.id}>
                      <div className=" hover:underline decoration-sky-600 text-sky-500">
                        <div className="flex">
                          <div className="mr-4 ml-4 ">
                            <h2 className=" ">{p.title}</h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vochome
export async function getStaticProps() {
  const posts = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        categories( where: {excludeTree: ["dGVybTox", "dGVybToyNg=="], order: ASC, orderby: SLUG}) {
          nodes {
            name
            posts {
              nodes {
                id
                title
              }
            }
          }
        }
      }`,
    }),
  })
  const res = await posts.json()
  return {
    props: {
      categories: res.data.categories.nodes,
    },
  }
}
