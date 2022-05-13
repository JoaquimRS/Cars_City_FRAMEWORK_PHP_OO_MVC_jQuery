function loadVerify(msg_verify) {  
    var root_form = document.getElementById("root_form")
    while (root_form.firstChild) {
        root_form.removeChild(root_form.lastChild)
    }
    var cont = document.createElement("div")
    var div = document.createElement("div")
    var title = document.createElement("h2")
    var button = document.createElement("button")

    cont.className = "cont_verify"
    div.id="root_verify"
    div.className="verify"
    if(msg_verify==true){
        title.appendChild(document.createTextNode("Email Verificado"))
    } else {
        title.appendChild(document.createTextNode(msg_verify))
    }
    button.type = "button"
    button.id = "verify"
    button.className = "submit"
    button.appendChild(document.createTextNode("Iniciar Sesion"))
    $(button).on("click",()=>{
        window.location.href = friendlyURLLogin("login")
    })
    root_form.appendChild(cont)
    cont.appendChild(div)
    div.appendChild(title)
    div.appendChild(button)
}

function loadError(msg){
    var root_form = document.getElementById("root_form")
    while (root_form.firstChild) {
        root_form.removeChild(root_form.lastChild)
    }
    var cont = document.createElement("div")
    var div = document.createElement("div")
    var title = document.createElement("h2")
    var button = document.createElement("button")

    cont.className = "cont_verify"
    div.id="root_verify"
    div.className="verify"
    title.appendChild(document.createTextNode(msg))
    title.className = "error-title"
    button.type = "button"
    button.id = "verify"
    button.className = "submit"
    button.appendChild(document.createTextNode("Volver a inicar sesion"))
    $(button).on("click",()=>{
        window.location.href = friendlyURLLogin("login")
    })
    root_form.appendChild(cont)
    cont.appendChild(div)
    div.appendChild(title)
    div.appendChild(button)
}

function checkVerify(){
    var auth = (window.location.pathname).split("/").slice(-2)
    if(auth.includes("verify")){
        if (auth[0]!="verify"){
            loadError("Error verificación email");
        } else {
            ajaxPromise("GET","JSON",friendlyURL("?module=login&op=verify_user&param="+auth[1]))
            .then(function(msg_verify){
                loadVerify(msg_verify);
            }).catch(function(error){
                loadError("Error verificación email");
            }) 
            
        }
    }

}

function TestFunction() {
    ajaxPromise("GET","JSON",friendlyURL("?module=login&op=submit_login"))
    .then(function(result){
        console.log(result);
    }).catch(function(error){
        console.log(error)
    }) 
    
}


$(document).ready(function () {
    checkVerify();
});