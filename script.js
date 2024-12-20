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
    //atualizar carrinho no mobile
    doc('.menu-openner span').innerHTML = car.length

    if(car.length > 0){
        doc('aside').classList.add('show')
        //zerando e mostrando a lista dos itens no carrinho
        doc('.cart').innerHTML = ''

        //Variaveis para desconto, subtotal e total
        let subtotal = 0
        let desconto = 0
        let total = 0

        //Retornando o item inteiro para o carrinho
        for(let i in car){
            let pizzaItem = pizzaJson.find((item) => item.id == car[i].id)
            subtotal += pizzaItem.price * car[i].qt           //subtotal

            //Clonar os itens e exibir na tela
            let carItem = doc('.models .cart--item').cloneNode(true)

            let pizzaSizeName //iniciando a variavel
            switch(car[i].size){
                    case 0:
                        pizzaSizeName = 'P'
                        break;
                    case 1:
                        pizzaSizeName = 'M'  
                        break;
                    case 2:
                        pizzaSizeName = 'G'
                        break;   
            }            
            //Concatenar nome e tamanho da pizza e mostrar no carrinho
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            //Mostra itens no carrinho
            carItem.querySelector('img').src = pizzaItem.img
            carItem.querySelector('.cart--item-nome').innerHTML = pizzaName
            carItem.querySelector('.cart--item--qt').innerHTML = car[i].qt
            //add e remove quantidade de pizzas do carrinho
            carItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(car[i].qt > 1){
                    car[i].qt--
                } else {
                    car.splice(i, 1)
                }
                updateCar()
            })
            carItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                car[i].qt++
                updateCar()
            })

            //Add os itens e exibir na tela
            doc('.cart').append(carItem)
        }
            //Calculo dos pedidos
            desconto = subtotal * 0.1
            total = subtotal - desconto

            //Mostrando na tela o resultado dos pedidos
            doc('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
            doc('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
            doc('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`



    } else {
        doc('aside').classList.remove('show')
    }
}