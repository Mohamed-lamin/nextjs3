import React from "react"
import Link from "next/link"

// let use = []
function Vochome({ posts }) {
  const titlesArray = posts
  return (
    <div className="container px-0 mx-auto w-11/12 " dir="rtl">
      <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
        Conversations - محادثات
      </h1>
      <div>
        {titlesArray?.map((item, index) => (
          <div key={index}>
            {item.posts.nodes.map((p, id) => (
              <div key={id}>
                <ul className="text-xs md:text-base md:mr-14 list-disc">
                  <li className="m-1">
                    <Link href={"/conversation/" + p.id}>
                      <div className=" hover:underline decoration-sky-600 text-sky-500">
                        <div className="flex">
                          <div className="mr-4 ml-4 ">
                            <h2 className=" ">{p.title} </h2>
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
        categories(where: {slug: "conversations"}) {
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
      posts: res.data.categories.nodes,
    },
  }
}
