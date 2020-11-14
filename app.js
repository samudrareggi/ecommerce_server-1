const express = require("express")
const port = process.env.PORT || 3000
const app = express()
const cors = require("cors")
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log("LOVE U " + port)
})

module.exports = app