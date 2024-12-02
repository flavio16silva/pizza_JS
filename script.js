//Variavel da quantidade de pizzas da modal:
let modalQtd = 1

//Substituindo o excessivo uso do 'querySelector' no codigo por uma função
    //retorna o item:
const doc = elemento => document.querySelector(elemento) 
    //retorna um array com os itens que achou:
const docAll = elemento => document.querySelectorAll(elemento) 

//Parametros do array= retorna cada pizza e também o index delas
pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true)

    //selecionando a pizza
    pizzaItem.setAttribute('data-key', index)
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
        let modalQtd = 1 //iniciando quantidade de pizzas na modal
        //preenchendo a pizza na modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        
        // preenchimento das informações da modal
        doc('.pizzaBig img').src = pizzaJson[key].img
        doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        doc('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        doc('.pizzaInfo--price').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

        //removendo o selected da tag
        doc('.pizzaInfo--size.selected').classList.remove('selected')
        //varrendo o array para saber o tamanho das pizzas
        docAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        })

        //iniciando a QTD das pizzas na modal
        doc('.pizzaInfo--qt').innerHTML = modalQtd
        
        //modal
        doc('.pizzaWindowArea').style.opacity = 0
        doc('.pizzaWindowArea').style.display = 'flex'
        setTimeout( () => {
            doc('.pizzaWindowArea').style.opacity = 1
        }, 200)
    })
    
    
    //preencher as informações em pizzaItem
    doc('.pizza-area').append(pizzaItem)

})
