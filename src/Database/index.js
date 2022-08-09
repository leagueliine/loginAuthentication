const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/authlogin')
  .then(() => {
    console.log('mongoDB online.')
  })
  .catch(erro => {
    console.log(erro)
  })

db = mongoose.connection
module.exports = db
