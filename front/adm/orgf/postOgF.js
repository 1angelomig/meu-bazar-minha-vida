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

function cadastraOrgf(){
    event.preventDefault()
    let url = 'http://localhost:8080/orgf'
    let nome = document.getElementById("nomeogf").value
    let descricao = document.getElementById("descogf").value
    
    body = {
        "nome": nome,
        "descricao": descricao
    }

    fazPost(url, body)
}