module.exports = function (err, req, res, next) {
  // console.log(err)
  const errors = []
  let status = 500
  let error = "INTERNAL SERVER ERROR"
  if (err.name === "SequelizeValidationError") {
    err.errors.map(el => {
      errors.push(el.message)
    })
    status = 400
    error = errors.join(", ")
  } else if (err.name === "Not Authorized") {
    status = 401
    error = err.name
  } else if (err.name === "Authentication Failed") {
    status = 401
    error = err.name
  } else if (err.name === "SequelizeUniqueConstraintError") {
    status = 400
    error = err.message
  } else if (err.status) {
    return res.status(err.status).json({ error: err.name })
  }
  res.status(status).json({ error })
}