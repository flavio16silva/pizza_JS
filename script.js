//Variavel para adicionar tudo dentro do carrinho. Gerar um array:
let car = []
//Variavel da quantidade de pizzas da modal:
let modalQtd = 1
//Variavel informar qual é a pizza
let modalKey = 0

//Substituindo o excessivo uso do 'querySelector' no codigo por uma função
    //retorna o item:
const doc = elemento => document.querySelector(elemento) 
    //retorna um array com os itens que achou:
const docAll = elemento => document.querySelectorAll(elemento) 

//Parametros do array = retorna cada pizza e o index - Listagem das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = doc('.models .pizza-item').cloneNode(true)

    //selecionando a pizza
    pizzaItem.setAttribute('data-key', index)
    //imagem das pizzas
    pizzaItem.querySelector('.pizza-item--img img').src = item.img

    //preço da pizza
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
  
    //nome da pizza
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name

    //descrição da pizza
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description

    //Adicionando evento de click para abrir o modal 
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        //pegando e preenchendo a pizza na modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key')
        
        modalQtd = 1 //iniciando quantidade de pizzas na modal - resetando
        modalKey = key //informar qual é a pizza
        
        // preenchimento das informações da modal
        doc('.pizzaBig img').src = pizzaJson[key].img
        doc('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        doc('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        doc('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`

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


//Eventos do Modal
function closeModal(){
    doc('.pizzaWindowArea').style.opacity = 0
    setTimeout(() => {
         doc('.pizzaWindowArea').style.display = 'none'
    }, 500)
}

docAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal)
})

// Ação do modal de '+' da modal
doc('.pizzaInfo--qtmais').addEventListener('click', ()=> {
    modalQtd++
    doc('.pizzaInfo--qt').innerHTML = modalQtd
})
// Ação do modal de '-' da modal
doc('.pizzaInfo--qtmenos').addEventListener('click', ()=> {
    if(modalQtd > 1){
        modalQtd--
        doc('.pizzaInfo--qt').innerHTML = modalQtd
    }
})

//Tamanhos das pizzas na modal
docAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e)=> {
        doc('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')        
    })
})

//Adicionando quantidades no carrinho
doc('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(doc('.pizzaInfo--size.selected').getAttribute('data-key'))

    //Verifica identificador das pizzas para add no carrinho - criar um unico array 
    let indentifier = pizzaJson[modalKey].id+'@'+size

    //Adicionando as pizzas no carrinho
    let addKey = car.findIndex((item) => item.indentifier == indentifier)
    if(addKey > -1){
        car[addKey].qt += modalQtd
    } else {
        //Objeto de retorno com os itens da pizza
        car.push({
            indentifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQtd
        })
    }
    updateCar()
    closeModal()
})

//Atualizar o carrinho de compras
function updateCar() {
    if(car.length > 0){
        doc('aside').classList.add('show')
    } else {
        doc('aside').classList.remove('show')
    }
}