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

function cadastraOrgd(){
    event.preventDefault()
    let url = 'http://localhost:8080/orgd'
    let nome = document.getElementById("nomeogd").value
    let descricao = document.getElementById("descogd").value
    let telefone = document.getElementById("telogd").value
    let endereco = document.getElementById("endogd").value
    let horafuncionamento = document.getElementById("hrfogd").value
    
    body = {
        "nome": nome,
        "descricao": descricao,
        "telefone": telefone,
        "endereco": endereco,
        "horarioFuncionamento": horafuncionamento
    }

    fazPost(url, body)
}