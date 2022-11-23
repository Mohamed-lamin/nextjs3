// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const lessons = [
  {
    wordar: "في الشارع",
    worden: "on the street",
  },
  {
    wordar: "في الشارع",
    worden: "on the street",
  },
  {
    wordar: "في الشارع",
    worden: "on the street",
  },
]
export default function handler(req, res) {
  const { pid } = req.query
  console.log(pid)
  // const resultid = lessons.filter(lesson => (lesson.id = pid))
  res.status(200).json(lessons)
}
