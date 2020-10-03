//Função primaria ela carrega atributos reutilizaveis a outras funções --Leonardo
function populate(url ,opcaoSelect) {

  fetch(url)
  .then( res => res.json() ).then( options => {
    
      for ( const option of options ) {
        opcaoSelect.innerHTML += `<option value="${option.id}">${option.nome}</option>`
      }

  } )

}

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  const urlStates = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

  populate(urlStates, ufSelect)

}

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const ufValue = event.target.value
  const cityUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  /* Linha abaixo está limpando o campo cidade, pois api está consumindo memória da aplicação
  com essa solução os campos de uf ao trocar o value, e refeito os valores do select da cidade*/
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true;

  /*Não conseguir reaproveitar minha função populate, pois essa fetch carrega argumentos especificos*/
  fetch(cityUrl)
  .then( res => res.json() ).then( cities => {
    
      for ( const city of cities ) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

  } )

  citySelect.disabled = false;

}

populateUFs()

document 
  /*querySelector está analisando as tags que possuo no meu html
  e está trazendo para o meu algoritmo como parametro o select name=uf*/
  .querySelector("select[name=uf]")
  .addEventListener("change",getCities)

/*Ítens de coleta
Pegar todos os Li´s*/
function handleSelectedItem(event) {
  const itemLi = event.target
  const itemId = itemLi.dataset.id

  //Adicionar ou remover uma classe em javascript
  itemLi.classList.toggle("selected")
  
  
  //Verificar se existem itens selecionados, se sim
  //Pegar os itens selecionados 
  const alreadySelected = selectedItems.findIndex( item => {
    return item == itemId
  })

  //Se já estiver selecionado 
  if( alreadySelected >=0) {
    //Tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      return item != itemId
    })
    selectedItems = filteredItems
  }else {
    //Se não estiver selecionado adicionar na seleção
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems

}

//Criei essa function para reutiliza-la e reduzir linhas de código - Leonardo
function clicked() {
  const itemsToColect = document.querySelectorAll(".items-grid li")

  for( const item of itemsToColect ) {
    item.addEventListener("click", handleSelectedItem)
  }
}

//Atualizar os campos escondidos com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")
//variavel fora das function
let selectedItems = []

clicked()