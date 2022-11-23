import Head from "next/head"
import Link from "next/link"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <div className="">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <title>تعلم اللغة الانجليزية</title>
      </Head>

      <div
        className=" relative md:container md:mx-auto w-full md:w-9/12   "
        dir="rtl"
      >
        <div>
          <Header />
        </div>

        <div className="mt-5   ">{children}</div>

        <Footer />
      </div>
    </div>
  )
}

export default Layout
