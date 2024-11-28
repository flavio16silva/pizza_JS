//Substituindo o excessivo uso do 'querySelector' no codigo por uma função
    //retorna o item:
const doc = elemento => document.querySelector(elemento) 
    //retorna um array com os itens que achou:
const docAll = elemento => document.querySelectorAll(elemento) 

//Parametros = retorna cada pizza e também o index delas
pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true)
    //preencher as informações em pizzaItem
    doc('.pizza-area').append(pizzaItem)

})
