function loadVerify(msg_verify) {  
    var root_verify = document.getElementById("root_verify")
    var title = document.createElement("h2")
    var button = document.createElement("button")

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
    root_verify.appendChild(title)
    root_verify.appendChild(button)
}

function loadError(){
    var root_verify = document.getElementById("root_verify")
    var title = document.createElement("h2")
    var button = document.createElement("button")

    title.appendChild(document.createTextNode("Error verificación email"))
    title.className = "error-title"
    button.type = "button"
    button.id = "verify"
    button.className = "submit"
    button.appendChild(document.createTextNode("Volver a inicar sesion"))
    $(button).on("click",()=>{
        window.location.href = friendlyURLLogin("login")
    })
    root_verify.appendChild(title)
    root_verify.appendChild(button)
}

function checkVerify(){
    var auth = (window.location.pathname).split("/").slice(-2)
    if(auth.includes("verify")){
        if (auth[0]!="verify"){
            loadError();
        } else {
            ajaxPromise("GET","JSON",friendlyURL("?module=login&op=verify_user&param="+auth[1]))
            .then(function(msg_verify){
                loadVerify(msg_verify);
            }).catch(function(error){
                loadError();
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