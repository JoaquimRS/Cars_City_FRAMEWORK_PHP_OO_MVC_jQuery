function friendlyURL(url) {
    var link="";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i=0; i<url.length; i++) {
    	cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
        	link +=  "/"+aux[1]+"/";	
        }else{
        	link +=  "/"+aux[1];
        }
    }
    return "http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC" + link;
}

function friendlyURLImages(urlImage) {
    return "http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC/" + urlImage;
}

function modal(msg) {

    var modal = document.createElement("div")
    var windowModal = document.createElement("div")
    var title = document.createElement("h3")
    var description = document.createElement("p")
    var x = document.createElement("span")
    var close = document.createElement("button")
    var login = document.createElement("button")

    modal.id = "simpleModal"
    modal.className = "modal open"
    windowModal.className = "modal-window"
    title.appendChild(document.createTextNode(msg.title))
    description.appendChild(document.createTextNode(msg.desc))
    x.className = "close"
    x.setAttribute("data-dismiss","modal")
    x.appendChild(document.createTextNode("x"))
    close.className = "close_button"
    close.setAttribute("data-dismiss","modal")
    close.appendChild(document.createTextNode("Continuar sin inicar sesion"))
    login.appendChild(document.createTextNode("Iniciar Sesion"))

    document.getElementById("simple_modal").appendChild(modal)
    modal.appendChild(windowModal)
    windowModal.appendChild(x)
    windowModal.appendChild(title)
    windowModal.appendChild(description)
    windowModal.appendChild(close)
    windowModal.appendChild(login)


    document.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
            location.reload()
        }
    });
    login.onclick = ()=>{
        var ll = window.location.search
        localStorage.setItem("ll",ll)
        window.location.href = "?module=controller_login&form=login"
    };
}

function logout(msg){
    localStorage.removeItem("token")
    
    ajaxPromiseToken("POST","JSON","module/login/controller/controller_login.php?op=logout")
    .then((jsonLogout)=>{
    }).catch(()=>{
        console.log("Error Logout");
    })
    if(msg){
        modal(msg);   
    } else {
        var ll = window.location.search
        localStorage.setItem("ll",ll)
        window.location.href = "?module=controller_login&form=login"
    }



};

function loadUser(token) {
    try {
        document.getElementById('login_button').remove
    } catch (error) {
    }

    if (token) {
        ajaxPromiseToken("POST","JSON","module/login/controller/controller_login.php?op=select_user")
        .then(function(jsonUser){
            if (jsonUser==false){
               // Token expirado
                logout({error:"10",title:"La sesion ha expirado",desc:"Su sesion ha expirado, por favor vuelva a iniciar sesión"})
            } else {
                var rootDiv = document.createElement('div')
                var divDrop = document.createElement('div')
                var img = document.createElement('img')
                var divDropContent = document.createElement('div')
                var logout_button = document.createElement('a')

                rootDiv.id = "login_button"
                rootDiv.className = "root-dropdown"
                divDrop.className = "dropdown"
                divDropContent.className = "dropdown-content"
                img.src = jsonUser.avatar
                logout_button.appendChild(document.createTextNode("logout"))

                document.getElementById('nav').appendChild(rootDiv)
                rootDiv.appendChild(divDrop)
                divDrop.appendChild(img)
                divDrop.appendChild(divDropContent)
                divDropContent.appendChild(logout_button)

                $(logout_button).on("click",()=>{
                    logout();
                })
            }
        }).catch(function(){
            console.log("Error Token User")
        });



    } else {
        var rootDiv = document.createElement('div')
        var div = document.createElement('div')
        var a = document.createElement('a')
        var img = document.createElement('img')

        rootDiv.id = "login_button"
        rootDiv.className = "login_button"
        div.className = "login_div"
        img.src = "http://ximo.com/tema6_ximo/4_framework_PHP_OO_MVC/view/inc/images/user_icon.png"

        document.getElementById('nav').appendChild(rootDiv)
        rootDiv.appendChild(div)
        div.appendChild(a)
        a.appendChild(img)

        $(a).on("click", ()=>{
            var ll = window.location.search
            localStorage.setItem("ll",ll)
            window.location.href = "?module=controller_login&form=login"
        })
    }

};


function getUser() {
    try {
        token = localStorage.getItem("token")
        loadUser(token);
    } catch (error) {
        loadUser();
    }
};

$(document).ready(function () {
    getUser();

});