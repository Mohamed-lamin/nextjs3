import styles from "../styles/humberguer.module.css"
function Humberguer({ setToggle }) {
  return (
    <div className={styles.humbcontainer}>
      <botton
        className="w-full h-full flex flex-col justify-around"
        onClick={setToggle}
      >
        <div className={styles.humb}></div>
        <div className={styles.humb}></div>
        <div className={styles.humb}></div>
      </botton>
    </div>
  )
}

export default Humberguer
