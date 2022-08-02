function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaCard(lote){
    card = document.createElement("div")
    card.className = "card"
    card.style.width = "18rem"
    card.style.margin = "30px 10px"

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = lote.id

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = lote.observacao

    bttn = document.createElement("button")
    bttn.className = "btn btn-primary"
    bttn.setAttribute('data-bs-toggle','modal')
    bttn.setAttribute('data-bs-target','#Modal' + lote.id)
    bttn.innerHTML = "Ver Produtos"

    modal = document.createElement("div")
    modal.className = "modal fade"
    modal.setAttribute("id", "Modal" + lote.id)
    modal.setAttribute("tabindex", "-1")
    modal.setAttribute("aria-labelledby", "exampleModalLabel")
    modal.setAttribute("aria-hidden", "true")

    modalDialog = document.createElement("div")
    modalDialog.className = "modal-dialog"

    modalContent = document.createElement("div")
    modalContent.className = "modal-content"

    modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"

    modalTittle = document.createElement("h5")
    modalTittle.className= "modal-title"
    modalTittle.setAttribute("id", "exampleModalLabel")
    modalTittle.innerHTML = lote.id

    modalBody = document.createElement("div")
    modalBody.className = "modal-body"

    modalBodyUl = document.createElement("ul")

    data1 = fazGet("http://localhost:8080/produtoslote/" + lote.id)
    produtos = JSON.parse(data1)

    produtos.forEach(element => {
        modalBodyLi = document.createElement("li")
        modalBodyLi.innerHTML = element.nome
        modalBodyUl.appendChild(modalBodyLi)
    });

    modalFooter = document.createElement("div")
    modalFooter.className = "modal-footer"

    modalCloseButton = document.createElement("button")
    modalCloseButton.className = "btn btn-primary"
    modalCloseButton.setAttribute("data-bs-dismiss", "modal")
    modalCloseButton.innerHTML = "Fechar"

    cardBody.appendChild(tittle)
    cardBody.appendChild(desc)
    cardBody.appendChild(bttn)
    modalHeader.appendChild(modalTittle)
    modalBody.appendChild(modalBodyUl)
    modalFooter.appendChild(modalCloseButton)
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)
    modalContent.appendChild(modalFooter)
    modalDialog.appendChild(modalContent)
    modal.appendChild(modalDialog)
    card.appendChild(cardBody)
    card.appendChild(modal)

    return card
}

function main(){
    baseURL = document.URL
    orgdId = baseURL.substring(baseURL.lastIndexOf('=') + 1)
    data1 = fazGet("http://localhost:8080/orgd/" + orgdId)
    orgd = JSON.parse(data1)
    
    orgdNome = document.getElementById("orgdNome")
    orgdNome.innerHTML = orgd.nome

    orgdNome = document.getElementById("orgdDesc")
    orgdNome.innerHTML = orgd.descricao

    data2 = fazGet("http://localhost:8080/lotesorgd/" + orgd.id)
    lotes = JSON.parse(data2)
    let mainDiv = document.getElementById("mainDiv")

    lotes.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });
}

main()