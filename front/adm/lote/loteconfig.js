function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaOption(element) {
    option = document.createElement("option")
    option.setAttribute("value", element.id)
    option.innerHTML = element.nome

    return option
}

function criaCard(lote) {
    card = document.createElement("div")
    card.className = "card"
    card.setAttribute("id", "card" + lote.id)
    card.style.width = "18rem"
    card.style.margin = "30px 10px"

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = lote.dataEntrega.slice(0, 10) + " às " + lote.dataEntrega.slice(12, 16)

    if (lote.orgf != null) {
        subtitle1 = document.createElement("h6")
        subtitle1.className = "card-subtitle mb-2 text-muted"
        subtitle1.innerHTML = "Fiscalizador: " + lote.orgf.nome
    }

    if (lote.orgd != null) {
        subtitle2 = document.createElement("h6")
        subtitle2.className = "card-subtitle mb-2 text-muted"
        subtitle2.innerHTML = "Donatário: " + lote.orgd.nome
    }

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = lote.observacao

    bttnEd = document.createElement("button")
    bttnEd.className = "btn btn-primary"
    bttnEd.setAttribute('data-bs-toggle', 'modal')
    bttnEd.setAttribute('data-bs-target', '#Editar' + lote.id)
    bttnEd.innerHTML = "Editar"

    bttnDel = document.createElement("button")
    bttnDel.className = "btn btn-primary"
    bttnDel.innerHTML = "Excluir"
    bttnDel.addEventListener('click', async function (target) {
        target.preventDefault()

        let request = new XMLHttpRequest()
        request.open("DELETE", "http://localhost:8080/lote/" + lote.id)
        request.send()

        request.onload = function () {
            alert(this.responseText)
            if (this.responseText.match("Prazo para deleter expirou")) {
                return
            }
            let c = document.getElementById("card" + lote.id)
            c.parentElement.removeChild(c)
        }
    })

    bttnProd = document.createElement("button")
    bttnProd.style.margin = "10px"
    bttnProd.className = "btn btn-primary"
    bttnProd.setAttribute('data-bs-toggle', 'modal')
    bttnProd.setAttribute('data-bs-target', '#Produtos' + lote.id)
    bttnProd.innerHTML = "Alterar Produtos"

    modalprod = document.createElement("div")
    modalprod.className = "modal fade"
    modalprod.setAttribute("id", "Produtos" + lote.id)
    modalprod.setAttribute("tabindex", "-1")
    modalprod.setAttribute("aria-labelledby", "exampleModalLabel")
    modalprod.setAttribute("aria-hidden", "true")

    modalprodDialog = document.createElement("div")
    modalprodDialog.className = "modal-dialog"

    modalprodContent = document.createElement("div")
    modalprodContent.className = "modal-content"

    modalprodHeader = document.createElement("div")
    modalprodHeader.className = "modal-header"

    modalprodTittle = document.createElement("h5")
    modalprodTittle.className = "modal-title"
    modalprodTittle.setAttribute("id", "exampleModalLabel")
    modalprodTittle.innerHTML = "Editar Produtos"

    modalprodBody = document.createElement("div")
    modalprodBody.className = "modal-body"

    //

    modalprodFormd2 = document.createElement("div")
    modalprodFormd2.className = "mb-3"

    modalprodFormd2label = document.createElement("label")
    modalprodFormd2label.className = "form-label"
    modalprodFormd2label.setAttribute("for", "escolheprod" + lote.id)
    modalprodFormd2label.innerHTML = "Segure CTRL e selecione os produtos para adicionar no lote"

    modalprodFormd2Select = document.createElement("select")
    modalprodFormd2Select.setAttribute("id", "escolheprod" + lote.id)
    modalprodFormd2Select.setAttribute("aria-label", ".form-select-lg example")
    modalprodFormd2Select.setAttribute("multiple", null)
    modalprodFormd2Select.className = "form-select form-select-lg mb-3"

    dataprod = fazGet("http://localhost:8080/produtos")
    prods = JSON.parse(dataprod)

    prods.forEach(element => {

        if (element.lote === null) {
            option = document.createElement("option")
            option.setAttribute("value", element.codigo)
            option.innerHTML = element.nome
            modalprodFormd2Select.appendChild(option)
        }

    });

    //

    modalprodFormd3 = document.createElement("div")
    modalprodFormd3.className = "mb-3"

    modalprodFormd3label = document.createElement("label")
    modalprodFormd3label.className = "form-label"
    modalprodFormd3label.setAttribute("for", "tiraprod" + lote.id)
    modalprodFormd3label.innerHTML = "Segure CTRL e selecione os produtos para retirar do lote"

    modalprodFormd3Select = document.createElement("select")
    modalprodFormd3Select.setAttribute("id", "tiraprod" + lote.id)
    modalprodFormd3Select.setAttribute("aria-label", ".form-select-lg example")
    modalprodFormd3Select.setAttribute("multiple", null)
    modalprodFormd3Select.className = "form-select form-select-lg mb-3"

    dataprod2 = fazGet("http://localhost:8080/produtos")
    prods2 = JSON.parse(dataprod)

    prods2.forEach(element => {

        if (element.lote !== null && element.lote.id === lote.id) {
            option = document.createElement("option")
            option.setAttribute("value", element.codigo)
            option.innerHTML = element.nome
            modalprodFormd3Select.appendChild(option)
        }

    });

    //

    modalprodFormEnviar = document.createElement("button")
    modalprodFormEnviar.setAttribute("type", "submit")
    modalprodFormEnviar.className = "btn btn-primary"
    modalprodFormEnviar.innerHTML = "Enviar"

    modalprodFormCancelar = document.createElement("button")
    modalprodFormCancelar.style.margin = "10px"
    modalprodFormCancelar.setAttribute("type", "button")
    modalprodFormCancelar.setAttribute("data-bs-dismiss", "modal")
    modalprodFormCancelar.setAttribute("onclick", "this.form.reset()")
    modalprodFormCancelar.className = "btn btn-secondary"
    modalprodFormCancelar.innerHTML = "Fechar"

    modalprodForm = document.createElement("form")
    modalprodForm.addEventListener("submit", function () {

        prodsselect = document.getElementById("escolheprod" + lote.id)

        for (var option of prodsselect.options) {

            if (option.selected) {
                dataprod = fazGet("http://localhost:8080/produto/" + option.value)
                prod = JSON.parse(dataprod)

                body = prod

                let request = new XMLHttpRequest()
                let url = "http://localhost:8080/produtolote/" + lote.id
                request.open("PUT", url, true)
                request.setRequestHeader("Content-type", "application/json")
                request.send(JSON.stringify(body))
            } 

        }

        prodsselect = document.getElementById("tiraprod" + lote.id)

        for (var option of prodsselect.options) {

            if (option.selected) {
                
                let request = new XMLHttpRequest()
                let url = "http://localhost:8080/tiraprodutodolote/" + option.value
                request.open("PUT", url, true)
                request.setRequestHeader("Content-type", "application/json")
                request.send()
            } 

        }

        alert("Produtos alterados com sucesso")
        window.location.reload()

    })

    modal = document.createElement("div")
    modal.className = "modal fade"
    modal.setAttribute("id", "Editar" + lote.id)
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
    modalTittle.innerHTML = "Editar Lote"

    modalBody = document.createElement("div")
    modalBody.className = "modal-body"

    modalFormd1 = document.createElement("div")
    modalFormd1.className = "mb-3"

    modalFormd1label = document.createElement("label")
    modalFormd1label.className = "form-label"
    modalFormd1label.setAttribute("for", "observacao" + lote.id)
    modalFormd1label.innerHTML = "Observação"

    modalFormd1Input = document.createElement("input")
    modalFormd1Input.setAttribute("type", "text");
    modalFormd1Input.setAttribute("id", "observacao" + lote.id);
    modalFormd1Input.setAttribute("name", "observacao" + lote.id)
    modalFormd1Input.className = "form-control"

    modalFormd2 = document.createElement("div")
    modalFormd2.className = "mb-3"

    modalFormd2label = document.createElement("label")
    modalFormd2label.className = "form-label"
    modalFormd2label.setAttribute("for", "orgfs" + lote.id)
    modalFormd2label.innerHTML = "Selecione o Orgão Fiscalizador Responsável"

    modalFormd2Help = document.createElement("div")
    modalFormd2Help.setAttribute("id", "emailHelp")
    modalFormd2Help.className = "form-text"
    modalFormd2Help.innerHTML = "Selecione o Orgão Fiscalizador Responsável"

    modalFormd2Select = document.createElement("select")
    modalFormd2Select.setAttribute("id", "orgfs" + lote.id)
    modalFormd2Select.setAttribute("aria-label", ".form-select-lg example")
    modalFormd2Select.className = "form-select form-select-lg mb-3"

    data1 = fazGet("http://localhost:8080/orgfs")
    orgfs = JSON.parse(data1)

    orgfs.forEach(element => {
        option = document.createElement("option")
        option.setAttribute("value", element.id)
        option.innerHTML = element.nome
        modalFormd2Select.appendChild(option)
    });

    modalFormd3 = document.createElement("div")
    modalFormd3.className = "mb-3"

    modalFormd3label = document.createElement("label")
    modalFormd3label.className = "form-label"
    modalFormd3label.setAttribute("for", "orgds" + lote.id)
    modalFormd3label.innerHTML = "Orgão Donatário"

    modalFormd3Help = document.createElement("div")
    modalFormd3Help.setAttribute("id", "emailHelp")
    modalFormd3Help.className = "form-text"
    modalFormd3Help.innerHTML = "Selecione o Orgão Donatário"

    modalFormd3Select = document.createElement("select")
    modalFormd3Select.setAttribute("id", "orgds" + lote.id)
    modalFormd3Select.setAttribute("aria-label", ".form-select-lg example")
    modalFormd3Select.className = "form-select form-select-lg mb-3"

    data2 = fazGet("http://localhost:8080/orgds")
    orgds = JSON.parse(data2)

    orgds.forEach(element => {
        option = document.createElement("option")
        option.setAttribute("value", element.id)
        option.innerHTML = element.nome
        modalFormd3Select.appendChild(option)
    });

    //

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
        let url = 'http://localhost:8080/lote/' + lote.id
        let observacao = document.getElementById("observacao" + lote.id).value
        let orgfs = document.getElementById("orgfs" + lote.id).value
        let orgds = document.getElementById("orgds" + lote.id).value

        dataorgf = fazGet("http://localhost:8080/orgf/" + orgfs)
        orgf = JSON.parse(dataorgf)
        dataorgd = fazGet("http://localhost:8080/orgd/" + orgds)
        orgd = JSON.parse(dataorgd)

        body1 = {
            "observacao": observacao,
            "orgf": orgf,
            "orgd": orgd
        }

        let request = new XMLHttpRequest()
        request.open("PUT", url, true)
        request.setRequestHeader("Content-type", "application/json")
        request.send(JSON.stringify(body1))

        request.onload = function () {
            window.location.reload();
            alert(this.responseText)
        }
    })

    modalprodFormd2.appendChild(modalprodFormd2label)
    modalprodFormd2.appendChild(modalprodFormd2Select)
    modalprodFormd3.appendChild(modalprodFormd3label)
    modalprodFormd3.appendChild(modalprodFormd3Select)
    modalFormd1.appendChild(modalFormd1label)
    modalFormd1.appendChild(modalFormd1Input)
    modalFormd2.appendChild(modalFormd2label)
    modalFormd2.appendChild(modalFormd2Help)
    modalFormd2.appendChild(modalFormd2Select)
    modalFormd3.appendChild(modalFormd3label)
    modalFormd3.appendChild(modalFormd3Help)
    modalFormd3.appendChild(modalFormd3Select)
    modalprodForm.appendChild(modalprodFormd2)
    modalprodForm.appendChild(modalprodFormd3)
    modalprodForm.appendChild(modalprodFormEnviar)
    modalprodForm.appendChild(modalprodFormCancelar)
    modalForm.appendChild(modalFormd1)
    modalForm.appendChild(modalFormd2)
    modalForm.appendChild(modalFormd3)
    modalForm.appendChild(modalFormEnviar)
    modalForm.appendChild(modalFormCancelar)
    modalprodHeader.appendChild(modalprodTittle)
    modalHeader.appendChild(modalTittle)
    modalprodBody.appendChild(modalprodForm)
    modalBody.appendChild(modalForm)
    modalprodContent.appendChild(modalprodHeader)
    modalprodContent.appendChild(modalprodBody)
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)
    modalprodDialog.appendChild(modalprodContent)
    modalDialog.appendChild(modalContent)
    modalprod.appendChild(modalprodDialog)
    modal.appendChild(modalDialog)
    cardBody.appendChild(tittle)
    if (lote.orgf != null) {
        cardBody.appendChild(subtitle1)
    }
    if (lote.orgd != null) {
        cardBody.appendChild(subtitle2)
    }
    cardBody.appendChild(desc)
    cardBody.appendChild(bttnEd)
    cardBody.appendChild(bttnProd)
    cardBody.appendChild(bttnDel)
    card.appendChild(cardBody)
    card.appendChild(modal)
    card.appendChild(modalprod)

    return card
}

function main() {
    data1 = fazGet("http://localhost:8080/orgfs")
    orgfs = JSON.parse(data1)
    let orgfsSelect = document.getElementById("orgfs")

    orgfs.forEach(element => {
        let option1 = criaOption(element)
        orgfsSelect.appendChild(option1)
    });

    data2 = fazGet("http://localhost:8080/orgds")
    orgds = JSON.parse(data2)
    let orgdsSelect = document.getElementById("orgds")

    orgds.forEach(element => {
        let option2 = criaOption(element)
        orgdsSelect.appendChild(option2)
    });

    data3 = fazGet("http://localhost:8080/lotes")
    lotes = JSON.parse(data3)
    let mainDiv = document.getElementById("mainDiv")

    lotes.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });
}

main()