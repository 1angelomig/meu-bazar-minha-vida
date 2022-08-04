function fazPost(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function() {
        window.location.reload();
        alert(this.responseText)
    }
}

function cadastraProd(){
    event.preventDefault()
    let url = 'http://localhost:8080/produto'
    let nome = document.getElementById("nomeprod").value
    let descricao = document.getElementById("descprod").value
    
    body = {
        "nome": nome,
        "descricao": descricao
    }

    fazPost(url, body)
}