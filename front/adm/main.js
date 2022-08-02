function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function fazDel(url){
    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.setRequestHeader("Content-type", "application/json")
    request.send
    
    return request.responseText
}

function criaCard(orgf){
    card = document.createElement("div")
    card.style.margin = "10px"
    card.className = "card"
    card.setAttribute("id", "card" + orgf.id)

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = orgf.nome

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = orgf.descricao

    del = document.createElement("button")
    del.style.margin = "10px"
    del.className = "btn btn-primary"
    del.innerHTML = "Excluir"
    del.addEventListener('click', async function (target){
        target.preventDefault()

        let request = new XMLHttpRequest()
        request.open("DELETE", "http://localhost:8080/orgf/" + orgf.id)
        request.send()
        
        request.onload = function() {
            alert(this.responseText)
            let c = document.getElementById("card"+orgf.id)
            c.parentElement.removeChild(c)
        }
    })

    upd = document.createElement("button")
    upd.style.margin = "10px"
    upd.className = "btn btn-primary"
    upd.setAttribute("data-dismiss", "modal")
    upd.setAttribute("data-bs-toggle", "modal")
    upd.setAttribute("data-bs-target", "#Update" + orgf.id)
    upd.innerHTML = "Editar"

    modal = document.createElement("div")
    modal.className = "modal fade"
    modal.setAttribute("id", "Update" + orgf.id)
    modal.setAttribute("tabindex","-1")
    modal.setAttribute("aria-labelledby","exampleModalLabel")
    modal.setAttribute("aria-hidden","true")

    modalDialog = document.createElement("div")
    modalDialog.className = "modal-dialog"

    modalContent = document.createElement("div")
    modalContent.className = "modal-content"

    modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"

    modalTitle = document.createElement("h5")
    modalTitle.className = "modal-title"
    modalTitle.setAttribute("id", "exampleModalLabel")
    modalTitle.innerHTML = orgf.nome

    modalBody = document.createElement("div")
    modalBody.className = "modal-body"

    modalForm = document.createElement("form")
    // modalForm.setAttribute("onsubmit","updateOrgf()")

    modalFormd1 = document.createElement("div")
    modalFormd1.className = "mb-3"

    modalFormd1label = document.createElement("label")
    modalFormd1label.className = "form-label"
    modalFormd1label.setAttribute("for","nameogf")

    modalFormd1Input = document.createElement("input")
    modalFormd1Input.setAttribute("type", "text");
    modalFormd1Input.setAttribute("id", "nameogf");

    modalFormd2 = document.createElement("div")
    modalFormd2.className = "mb-3"

    modalFormd2label = document.createElement("label")
    modalFormd2label.className = "form-label"
    modalFormd2label.setAttribute("for","descogf")

    modalFormd2Input = document.createElement("input")
    modalFormd2Input.setAttribute("type", "text");
    modalFormd2Input.setAttribute("id", "descogf");

    cardBody.appendChild(tittle)
    cardBody.appendChild(desc)
    cardBody.appendChild(del)
    cardBody.appendChild(upd)
    card.appendChild(cardBody)
    modalFormd1.appendChild(modalFormd1label)
    modalFormd1.appendChild(modalFormd1Input)
    modalFormd2.appendChild(modalFormd2label)
    modalFormd2.appendChild(modalFormd2Input)
    modalForm.appendChild(modalFormd1)
    modalForm.appendChild(modalFormd2)
    modalHeader.appendChild(modalTitle)
    modalBody.appendChild(modalForm)
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)
    modalDialog.appendChild(modalContent)
    modal.appendChild(modalDialog)
    card.appendChild(modal)
    return card
}

function main(){
    data = fazGet("http://localhost:8080/orgfs")
    orgfs = JSON.parse(data)
    let mainDiv = document.getElementById("mdbody")

    orgfs.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });
}

main()