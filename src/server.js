const express = require("express")
const server = express()

//Configurando a pasta pública
server.use(express.static("public"))

//Utilizando template nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})



//Configurando os caminhos da minha aplicação
//Pagina inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search", (req, res) => {
  return res.render("search-results.html")
})

//Ligar Servidor
server.listen(3000)