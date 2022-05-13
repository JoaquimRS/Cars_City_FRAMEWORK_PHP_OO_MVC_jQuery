function validateEmailReg(email) {
    if (email.length > 0){
        var reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return reg.test(email);
    }
    return false;
};

function validatePasswordRec(password) {
    if (password.length > 0){
        var strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var weakReg = /^[a-zA-Z0-9_\.]+$/;
        // return weakReg.test(password);
        return strongReg.test(password);
    }
    return false;
};

function validatePassword2Rec(password1, password2) {
    if (password1==password2) {
        return true;
    }
    return false;

};
function validateRecover() {
    var check=true;
    
    var password = validatePasswordRec(document.getElementById("rec_password").value)
    var password2= validatePassword2Rec(document.getElementById("rec_password").value, document.getElementById("rec_password_2").value);

    if (!password) {
        document.getElementById("error_rec_password").innerHTML = "Contraseña incorrecta"
        str = "La contraseña debe contener: 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y 1 caracter especial=!@#$%^&*";
        toastr.info(str)
        check=false
    } else {
        document.getElementById("error_rec_password").innerHTML = ""
    }
    if (!password2) {
        str="Las contraseñas no coinciden"
        document.getElementById("error_rec_password_2").innerHTML = str
        toastr.warning(str)
        check=false
    } else {
        document.getElementById("error_rec_password_2").innerHTML = ""
    }
    // check=true;
    return check;
}

function validateEmail() {
    var check=true;
    
    var email = validateEmailReg(document.getElementById("email").value)

    if (!email) {
        str = "Email incorrecto"
        document.getElementById("error_rec_email").innerHTML = str
        toastr.warning(str)
        check=false
    } else {
        document.getElementById("error_rec_email").innerHTML = ""
    }
    // check=true;
    return check;
}

function changeInputs() {
    $(document).on("click","#password_image", ()=>{
        var images = document.querySelectorAll("[id='password_image']");
        var password_image = document.getElementById("password_image")
        var show = password_image.getAttribute("show")

        if (show=="true") {
            document.getElementById("rec_password_2").type = "password"
            document.getElementById("rec_password").type = "password"
            for(var i = 0; i < images.length; i++) 
            images[i].setAttribute("src",friendlyURLImages("view/img/login/hide_password.png"))
            
            password_image.setAttribute("show","false")
        } else {
            document.getElementById("rec_password_2").type = "text"
            document.getElementById("rec_password").type = "text"
            for(var i = 0; i < images.length; i++) 
            images[i].setAttribute("src",friendlyURLImages("view/img/login/show_password.png"))
            
            password_image.setAttribute("show","true")
        }
        
    })
}

function loadLastLocation() {
    var ll = friendlyURLLogin("login")
    window.location.href = ll
}

function submitEmail() {
    ajaxPromise("POST","JSON",friendlyURL("?module=login&op=recover_email"),{["email"]:document.getElementById("email").value})
    .then(function(jsonSendEmail){
        toastr.success("Correo enviado");
        setTimeout(()=>{
            loadLastLocation()
        },3000);
        }).catch(function(){
            loadError("Error recuperar contraseña");
        });
}

function submitRecover(token) {
    var inputs = document.getElementsByClassName("recover");
    var forminfo = {}
    $.each(inputs, function (index, input) { 
        var key = input.id
        var value = input.value
        forminfo[key] = value  
        
    });
    forminfo.token = token;
    ajaxPromise("POST","JSON",friendlyURL("?module=login&op=recover_password"),forminfo)
    .then(function(jsonRecover){
        toastr.success("Contraseña cambiada correctamente");
        setTimeout(()=>{
            loadLastLocation()
        },3000);
        }).catch(function(){
            loadError("Error recuperar contraseña");
        });
}

function submitValidateRecover(token) {
    $("#recover").on("click", () =>{
        if (validateRecover()) {
            submitRecover(token);
        }
    })
    $(document).on('keypress',function(key) {
        if(key.which == 13) {
            if (validateRecover()) {
                submitRecover(token);
            }
        }
        
    });
}
function submitValidateEmail() {
    $("#rec_email").on("click", () =>{
        if (validateEmail()!="") {
            submitEmail();

        }
    })
    $(document).on('keypress',function(key) {
        if(key.which == 13) {
            if (validateEmail()) {
                submitEmail();
            }
        }
        
    });
}
function checkRecover(){
    var auth = (window.location.pathname).split("/").slice(-2)
    if(auth.includes("recover")){
        if (auth[0]!="recover"){
            loadError("Error recuperar contraseña");
        } else {
            changeInputs();
            submitValidateRecover(auth[1]);
            
        }
    } if (auth.includes("ask_email")) {
        if (auth[1]!="ask_email"){
            loadError("Error recuperar correo");
        } else {
            submitValidateEmail();
        }
    }

}
$(document).ready(function () {
    checkRecover();
});