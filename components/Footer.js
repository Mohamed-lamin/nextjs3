import styles from "../styles/Home.module.css"
import Link from "next/link"

function Footer() {
  return (
    <div className="w-full  ">
      <footer className="w-50 mt-5 flex justify-start   ">
        <div className="text-xs md:text-sm m-2 ">
          <Link href="../contactus">
            <h6>Contact us</h6>
          </Link>
        </div>
        <div className="text-xs md:text-sm m-2">
          <Link href="../privacy-policy">
            <h6 className="  ">Privacy Policy</h6>
          </Link>
        </div>
        <div className="text-xs md:text-sm m-2">
          <Link href="../termsandconditions">
            <h6>Terms and Conditions</h6>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Footer
