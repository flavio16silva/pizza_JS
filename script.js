//Substituindo o excessivo uso do 'querySelector' no codigo por uma função
    //retorna o item:
const doc = elemento => document.querySelector(elemento) 
    //retorna um array com os itens que achou:
const docAll = elemento => document.querySelectorAll(elemento) 

//Parametros do array= retorna cada pizza e também o index delas
pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true)
    //imagem das pizzas
    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    //preço da pizza
    //pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    const pizzaPrice = item.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      pizzaItem.querySelector(".pizza-item--price").innerHTML = `${pizzaPrice}`;

    //nome da pizza
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name

    //descrição da pizza
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    //Desativando a atualização da pagina no momento do click
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        //modal
        doc('.pizzaWindowArea').style.display = 'flex'
    })
    
    
    //preencher as informações em pizzaItem
    doc('.pizza-area').append(pizzaItem)

})
