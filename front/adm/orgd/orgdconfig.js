function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function fazModal(orgd) {
    modal = document.createElement("div")
    modal.className = "modal fade"
    modal.setAttribute("id", "Editar" + orgd.id)
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
    modalTittle.innerHTML = "Editar Orgão Donatário: " + orgd.nome

    modalBody = document.createElement("div")
    modalBody.className = "modal-body"

    modalFormd1 = document.createElement("div")
    modalFormd1.className = "mb-3"

    modalFormd1label = document.createElement("label")
    modalFormd1label.className = "form-label"
    modalFormd1label.setAttribute("for", "nameogf" + orgd.id)
    modalFormd1label.innerHTML = "Nome"

    modalFormd1Input = document.createElement("input")
    modalFormd1Input.setAttribute("type", "text");
    modalFormd1Input.setAttribute("id", "nameogf" + orgd.id);
    modalFormd1Input.setAttribute("name", "nameogf" + orgd.id)
    modalFormd1Input.className = "form-control"

    modalFormd2 = document.createElement("div")
    modalFormd2.className = "mb-3"

    modalFormd2label = document.createElement("label")
    modalFormd2label.className = "form-label"
    modalFormd2label.setAttribute("for", "descogf" + orgd.id)
    modalFormd2label.innerHTML = "Descrição"

    modalFormd2Input = document.createElement("input")
    modalFormd2Input.setAttribute("type", "text");
    modalFormd2Input.setAttribute("id", "descogf" + orgd.id);
    modalFormd2Input.setAttribute("name", "descogf" + orgd.id)
    modalFormd2Input.className = "form-control"

    modalFormd3 = document.createElement("div")
    modalFormd3.className = "mb-3"

    modalFormd3label = document.createElement("label")
    modalFormd3label.className = "form-label"
    modalFormd3label.setAttribute("for", "telogd" + orgd.id)
    modalFormd3label.innerHTML = "Telefone (11 números)"

    modalFormd3Input = document.createElement("input")
    modalFormd3Input.setAttribute("type", "text");
    modalFormd3Input.setAttribute("id", "telogd" + orgd.id);
    modalFormd3Input.setAttribute("name", "telogd" + orgd.id)
    modalFormd3Input.className = "form-control"

    modalFormd4 = document.createElement("div")
    modalFormd4.className = "mb-3"

    modalFormd4label = document.createElement("label")
    modalFormd4label.className = "form-label"
    modalFormd4label.setAttribute("for", "endogd" + orgd.id)
    modalFormd4label.innerHTML = "Endereço"

    modalFormd4Input = document.createElement("input")
    modalFormd4Input.setAttribute("type", "text");
    modalFormd4Input.setAttribute("id", "endogd" + orgd.id);
    modalFormd4Input.setAttribute("name", "endogd" + orgd.id)
    modalFormd4Input.className = "form-control"

    modalFormd5 = document.createElement("div")
    modalFormd5.className = "mb-3"

    modalFormd5label = document.createElement("label")
    modalFormd5label.className = "form-label"
    modalFormd5label.setAttribute("for", "hrfogd" + orgd.id)
    modalFormd5label.innerHTML = "Horário de Funcionamento"

    modalFormd5Input = document.createElement("input")
    modalFormd5Input.setAttribute("type", "text");
    modalFormd5Input.setAttribute("id", "hrfogd" + orgd.id);
    modalFormd5Input.setAttribute("name", "hrfogd" + orgd.id)
    modalFormd5Input.className = "form-control"

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
        let url = 'http://localhost:8080/orgd/' + orgd.id
        let nome = document.getElementById("nameogf" + orgd.id).value
        let descricao = document.getElementById("descogf" + orgd.id).value
        let telefone = document.getElementById("telogd" + orgd.id).value
        let endereco = document.getElementById("endogd" + orgd.id).value
        let horafuncionamento = document.getElementById("hrfogd" + orgd.id).value

        body = {
            "nome": nome,
            "descricao": descricao,
            "telefone": telefone,
            "endereco": endereco,
            "horarioFuncionamento": horafuncionamento
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
    modalFormd3.appendChild(modalFormd3label)
    modalFormd3.appendChild(modalFormd3Input)
    modalFormd4.appendChild(modalFormd4label)
    modalFormd4.appendChild(modalFormd4Input)
    modalFormd5.appendChild(modalFormd5label)
    modalFormd5.appendChild(modalFormd5Input)
    modalForm.appendChild(modalFormd1)
    modalForm.appendChild(modalFormd2)
    modalForm.appendChild(modalFormd3)
    modalForm.appendChild(modalFormd4)
    modalForm.appendChild(modalFormd5)
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

function criaCard(orgd) {
    card = document.createElement("div")
    card.className = "card"
    card.setAttribute("id", "card" + orgd.id)
    card.style.width = "18rem"
    card.style.margin = "30px 10px"

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = orgd.nome

    subtitle1 = document.createElement("h6")
    subtitle1.className = "card-subtitle mb-2 text-muted"
    subtitle1.innerHTML = "<b>Endereço: </b>" + orgd.endereco + "</br>"
    + "</br><b>Telefone: </b>" + "(" + orgd.telefone.slice(0,2) + ")" + orgd.telefone.slice(2,7) + "-" + orgd.telefone.slice(7,11) + "</br>"
    + "</br><b>Horário de funcionamento: </b>" + orgd.horarioFuncionamento

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = orgd.descricao

    bttnEd = document.createElement("button")
    bttnEd.className = "btn btn-primary"
    bttnEd.setAttribute('data-bs-toggle', 'modal')
    bttnEd.setAttribute('data-bs-target', '#Editar' + orgd.id)
    bttnEd.innerHTML = "Editar"

    bttnDel = document.createElement("button")
    bttnDel.style.margin = "10px"
    bttnDel.className = "btn btn-primary"
    bttnDel.innerHTML = "Excluir"
    bttnDel.addEventListener('click', async function (target) {
        target.preventDefault()

        let request = new XMLHttpRequest()
        request.open("DELETE", "http://localhost:8080/orgd/" + orgd.id)
        request.send()

        request.onload = function () {
            alert(this.responseText)
            let c = document.getElementById("card" + orgd.id)
            c.parentElement.removeChild(c)
        }
    })

    modalEditar = fazModal(orgd)

    cardBody.appendChild(tittle)
    cardBody.appendChild(subtitle1)
    cardBody.appendChild(desc)
    cardBody.appendChild(bttnEd)
    cardBody.appendChild(bttnDel)
    card.appendChild(cardBody)
    card.appendChild(modalEditar)

    return card
}

function main() {
    data = fazGet("http://localhost:8080/orgds")
    orgds = JSON.parse(data)
    let mainDiv = document.getElementById("mainDiv")

    orgds.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });
}

main()