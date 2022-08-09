const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// CONTROLLERS
const Logar = require('./Controllers/Users/Logar')
const Logado = require('./Controllers/Users/logado')
const Deslogar = require('./controllers/Users/Deslogar')

// APP
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/Pages', express.static(__dirname + '/Pages'))

// DATABASE
const Database = require('./Database')

// PAGES
app.get('/', (req, res) => res.sendFile(__dirname + '/Pages/Index/index.html'))
app.get('/privado', Logado, (req, res) =>
  res.send('Somente usuários logados podem ver este conteúdo.')
)

//ROUTERS
app.post('/api/users/logar', async (req, res) => {
  res.send(await Logar(req.body))
})

app.get('/api/users/Deslogar', async (req, res) => {
  res.send(await Deslogar())
})

// PORT
app.listen(3030, () => {
  console.log('Servidor online')
})
