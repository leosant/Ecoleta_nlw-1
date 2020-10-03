const express = require("express")
const server = express()

//Configurando a pasta pública
server.use(express.static("public"))

//Configurando os caminhos da minha aplicação
//Pagina inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req, res) => {
  res.sendFile(__dirname + "/views/create-point.html")
})

//Ligar Servidor
server.listen(3000)