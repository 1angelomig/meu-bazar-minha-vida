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

function fazGet(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function cadastraLote(){
    event.preventDefault()
    let url = 'http://localhost:8080/lote'
    let observacao = document.getElementById("observacao").value
    let orgfs = document.getElementById("orgfs").value
    let orgds = document.getElementById("orgds").value
    
    dataorgf = fazGet("http://localhost:8080/orgf/" + orgfs)
    orgf = JSON.parse(dataorgf)
    dataorgd = fazGet("http://localhost:8080/orgd/" + orgds)
    orgd = JSON.parse(dataorgd)
    
    // for(option of document.getElementById('prods').options){
    //     if (option.selected) {
    //         dataprod = fazGet("http://localhost:8080/produto/" + option.value)
    //         prod = JSON.parse(dataprod)
    //     }
    // }
    
    body = {
        "observacao": observacao,
        "orgf": orgf,
        "orgd": orgd
    }

    fazPost(url, body)
}