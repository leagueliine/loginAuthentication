const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../../Database/index')

async function Logar(body) {
  //RECEBE OS DADOS SO USUÁRIO.
  const email = body.email
  const senha = body.senha

  //VERIFICAÇÃO DE DADOS
  if (!email || !senha) {
    return { erro: 'Dados Insuficientes.' }
  }

  //BUSCA O USUÁRIO NO DB
  Find = await User.find([email, senha])
    .then(response => {
      return response
    })
    .catch(erro => {
      return { erro: erro }
    })

  //VERIFICA SE ENCONTROU.
  if (Find == '' || Find.erro) {
    return { erro: 'E-mail ou senha incorretos.' }
  }
  //SE ENCONTROU, GERA O TOKEN
  Toekn = await jsonwebtoken.sign(
    {
      id: Find[0]._id,
      nome: Find[0].nome,
      email: Find[0].email
    },
    'SenhaParaProtegerOToken'
  )

  module.exports = Logar

  //SALVA O TOKEN NOS COOKIES DO NAVEGADOR
  res.cookie('Token', Token)
  res.sendStatus(200)
}
