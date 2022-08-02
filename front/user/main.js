function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function criaCard(orgd){
    card = document.createElement("div")
    card.className = "card"
    card.style.width = "18rem"
    card.style.margin = "30px 10px"

    cardBody = document.createElement("div")
    cardBody.className = "card-body"

    tittle = document.createElement("h5")
    tittle.className = "card-title"
    tittle.innerHTML = orgd.nome

    desc = document.createElement("p")
    desc.className = "card-text"
    desc.innerHTML = orgd.descricao

    bttn = document.createElement("a")
    bttn.className = "btn btn-primary"
    bttn.href = "orgdonatario.html?orgid=" + orgd.id
    bttn.innerHTML = "Ver Lotes"

    cardBody.appendChild(tittle)
    cardBody.appendChild(desc)
    cardBody.appendChild(bttn)
    card.appendChild(cardBody)

    return card
}

function main(){
    data = fazGet("http://localhost:8080/orgds")
    orgds = JSON.parse(data)
    let mainDiv = document.getElementById("mainDiv")

    orgds.forEach(element => {
        let card = criaCard(element)
        mainDiv.appendChild(card)
    });

    console.log(orgds)
}

main()