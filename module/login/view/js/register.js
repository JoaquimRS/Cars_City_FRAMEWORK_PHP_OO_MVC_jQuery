function validateUserReg(user) {
    if (user.length > 0){
        var reg = /^[a-zA-Z0-9_\.]+$/;
        return reg.test(user);
    }
    return false;
};

function validateEmailReg(email) {
    if (email.length > 0){
        var reg =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return reg.test(email);
    }
    return false;
};

function validatePasswordReg(password) {
    if (password.length > 0){
        var strongReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var weakReg = /^[a-zA-Z0-9_\.]+$/;
        // return weakReg.test(password);
        return strongReg.test(password);
    }
    return false;
};

function validatePassword2Reg(password1, password2) {
    if (password1==password2) {
        return true;
    }
    return false;

};


function validateRegister() {
    var check=true;
    
    var username = validateUserReg(document.getElementById("reg_username").value)
    var usernametext = document.getElementById("reg_username").value
    var email = validateEmailReg(document.getElementById("reg_email").value)
    var password = validatePasswordReg(document.getElementById("reg_password").value)
    var password2= validatePassword2Reg(document.getElementById("reg_password").value, document.getElementById("reg_password_2").value);

    if (!username) {
        str = "Usuario incorrecto"
        document.getElementById("error_reg_username").innerHTML = str
        toastr.warning(str)
        check=false
    } else {
        document.getElementById("error_reg_username").innerHTML = ""
    }
    if (!email) {
        str = "Email incorrecto"
        document.getElementById("error_reg_email").innerHTML = str
        toastr.warning(str)
        check=false
    } else {
        document.getElementById("error_reg_email").innerHTML = ""
    }
    if (!password) {
        document.getElementById("error_reg_password").innerHTML = "Contraseña incorrecta"
        str = "La contraseña debe contener: 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y 1 caracter especial=!@#$%^&*";
        toastr.info(str)
        check=false
    } else {
        document.getElementById("error_reg_password").innerHTML = ""
    }
    if (!password2) {
        str="Las contraseñas no coinciden"
        document.getElementById("error_reg_password_2").innerHTML = str
        toastr.warning(str)
        check=false
    } else {
        document.getElementById("error_reg_password_2").innerHTML = ""
    }
    // check=true;
    return check;
}

function loadLastLocation() {
    var ll = friendlyURL("?module=home&op=view")
    if (localStorage.getItem('ll')) {
        ll = localStorage.getItem('ll')
    }
    localStorage.removeItem("ll")
    window.location.href = ll
}

function submitRegister() {
    var inputs = document.getElementsByClassName("register");
    var forminfo = {}
    $.each(inputs, function (index, input) { 
        var key = input.id
        var value = input.value
        forminfo[key] = value  
        
    });
    
    ajaxPromise("POST","JSON",friendlyURL("?module=login&op=submit_register"),forminfo)
    .then(function(json){
            check=true
            try {
                document.getElementById(json.src).innerHTML=json.error
                check=false
                toastr.error(json.error);
            } catch (error) {
            }
            if (check){
                toastr.success("Te has registrado correctamente");
                toastr.info(json.msg);
            }
        }).catch(function(){
            console.log("Error Register")
        });
};

function submitValidateRegister () {
    $("#register").on("click", () =>{
        if (validateRegister()) {
            submitRegister();
        }

        

    })
    $(document).on('keypress',function(key) {
        var auth = (window.location.pathname).split("/").slice(-1).toString()
        if(key.which == 13 && auth=="register") {
            if (validateRegister()) {
                submitRegister();
            }
        }
        
    });

};


$(document).ready(function () {
    submitValidateRegister();
});