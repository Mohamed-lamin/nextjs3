import React from "react"
import { Cursor, useTypewriter } from "react-simple-typewriter"
import styles from "../styles/Home.module.css"
function Writing() {
  const [text, count] = useTypewriter({
    words: ["مرحبا بك على Easy English", "Welcome to Easy English"],
    loop: true,
    delaySpeed: 2000,
  })
  return (
    <div className="h-25 flex items-center">
      <h1 className="writing" dir="rtl">
        <span>{text}</span>
        <Cursor cursorColor="blue" />
      </h1>
    </div>
  )
}

export default Writing
