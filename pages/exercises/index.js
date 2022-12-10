import Exercise from "./exercise"
import Title from "./title"
import Head from "next/head"

function Home({ posts }) {
  return (
    <>
      <Head>
        <title>تمارين باللغة الإنجليزية - English Exercices</title>
        <meta
          name="description"
          content="تمارين ستكسبك مهارة في التعامل مع جميع الأزمنة باللغة الإنجليزية"
        />
        <meta property="og:title" content="تمارين باللغة الإنجليزية" />
        <meta property="og:image" content="../../public/images/exercises.png" />
      </Head>
      <div className="container px-0 mx-auto w-11/12 " dir="rtl">
        <h1 className="text-xl font-bold text-center mb-10 text-blue-300">
          Exercises - تمارين
        </h1>
        {posts.map(item => (
          <div key={item.index}>
            <h1 className="text-xs md:text-base font-bold mx-10 mt-10 mb-3">
              {item.name}
            </h1>
            {item.posts.nodes.map((itemsub, index) => (
              <div key={index}>
                <Title id={itemsub.id} name={itemsub.title} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
export async function getStaticProps() {
  const posts = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        tags {
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
      posts: res.data.tags.nodes,
    },
  }
}
