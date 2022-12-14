function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function fazModal(produto) {
    modal = document.createElement("div")
    modal.className = "modal fade"
    modal.setAttribute("id", "Editar" + produto.codigo)
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
    modalTittle.className = "modal-title"
    modalTittle.setAttribute("id", "exampleModalLabel")
    modalTittle.innerHTML = "Editar Produto: " + produto.nome

    modalBody = document.createElement("div")
    modalBody.className = "modal-body"

    modalFormd1 = document.createElement("div")
    modalFormd1.className = "mb-3"

    modalFormd1label = document.createElement("label")
    modalFormd1label.className = "form-label"
    modalFormd1label.setAttribute("for", "nomeprod" + produto.codigo)
    modalFormd1label.innerHTML = "Nome"

    modalFormd1Input = document.createElement("input")
    modalFormd1Input.setAttribute("type", "text");
    modalFormd1Input.setAttribute("id", "nomeprod" + produto.codigo);
    modalFormd1Input.setAttribute("name", "nomeprod" + produto.codigo)
    modalFormd1Input.className = "form-control"

    modalFormd2 = document.createElement("div")
    modalFormd2.className = "mb-3"

    modalFormd2label = document.createElement("label")
    modalFormd2label.className = "form-label"
    modalFormd2label.setAttribute("for", "descprod" + produto.codigo)
    modalFormd2label.innerHTML = "Descrição"

    modalFormd2Input = document.createElement("input")
    modalFormd2Input.setAttribute("type", "text");
    modalFormd2Input.setAttribute("id", "descprod" + produto.codigo);
    modalFormd2Input.setAttribute("name", "descprod" + produto.codigo)
    modalFormd2Input.className = "form-control"

    modalFormEnviar = document.createElement("button")
    modalFormEnviar.setAttribute("type", "submit")
    modalFormEnviar.className = "btn btn-primary"
    modalFormEnviar.innerHTML = "Enviar"

    modalFormCancelar = document.createElement("button")
    modalFormCancelar.style.margin = "10px"
    modalFormCancelar.setAttribute("type", "button")
    modalFormCancelar.setAttribute("data-bs-dismiss", "modal")
    modalFormCancelar.setAttribute("onclick", "this.form.reset()")
    modalFormCancelar.className = "btn btn-secondary"
    modalFormCancelar.innerHTML = "Fechar"

    modalForm = document.createElement("form")
    modalForm.addEventListener("submit", function () {
        event.preventDefault()
        let url = 'http://localhost:8080/produto/' + produto.codigo
        let nome = document.getElementById("nomeprod" + produto.codigo).value
        let descricao = document.getElementById("descprod" + produto.codigo).value

        body = {
            "nome": nome,
            "descricao": descricao
        }

        let request = new XMLHttpRequest()
        request.open("PUT", url, true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(JSON.stringify(body))

        request.onload = function () {
            window.location.reload();
            alert(this.responseText)
        }
    });

    modalFormd1.appendChild(modalFormd1label)
    modalFormd1.appendChild(modalFormd1Input)
    modalFormd2.appendChild(modalFormd2label)
    modalFormd2.appendChild(modalFormd2Input)
    modalForm.appendChild(modalFormd1)
    modalForm.appendChild(modalFormd2)
    modalForm.appendChild(modalFormEnviar)
    modalForm.appendChild(modalFormCancelar)
    modalBody.appendChild(modalForm)
    modalHeader.appendChild(modalTittle)
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)
    modalDialog.appendChild(modalContent)
    modal.appendChild(modalDialog)

    return modal
}

function criaCard(produto) {
    card = document.createElement("div")
    card.className = "card"
    card.setAttribute("id", "card" + produto.codigo)
    card.style.width = "18rem"
    card.style.margin = "30px 10px"

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = produto.nome

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = produto.descricao

    bttnEd = document.createElement("button")
    bttnEd.className = "btn btn-primary"
    bttnEd.setAttribute('data-bs-toggle', 'modal')
    bttnEd.setAttribute('data-bs-target', '#Editar' + produto.codigo)
    bttnEd.innerHTML = "Editar"

    bttnDel = document.createElement("button")
    bttnDel.style.margin = "10px"
    bttnDel.className = "btn btn-primary"
    bttnDel.innerHTML = "Excluir"
    bttnDel.addEventListener('click', async function (target) {
        target.preventDefault()

        let request = new XMLHttpRequest()
        request.open("DELETE", "http://localhost:8080/produto/" + produto.codigo)
        request.send()

        request.onload = function () {
            alert(this.responseText)
            let c = document.getElementById("card" + produto.codigo)
            c.parentElement.removeChild(c)
        }
    })

    modalEditar = fazModal(produto)

    cardBody.appendChild(tittle)
    cardBody.appendChild(desc)
    cardBody.appendChild(bttnEd)
    cardBody.appendChild(bttnDel)
    card.appendChild(cardBody)
    card.appendChild(modalEditar)

    return card
}

function main() {
    data = fazGet("http://localhost:8080/produtos")
    produtos = JSON.parse(data)
    let mainDiv = document.getElementById("mainDiv")

    produtos.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });
}

main()