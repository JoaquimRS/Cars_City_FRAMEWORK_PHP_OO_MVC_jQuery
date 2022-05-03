function click_send_email() {
	$(".button__contact").on('click', '#send_contact', function () {
		check_email();
	});
}

function check_email() {
	$(document).on('click','#send_contact',function(){
		// send_email({name:$("#name").val(), email:$("#email").val(), matter:$("#matter").val(), message:$("#message").val()});
		result = true;
		$(".error").remove();


		var pname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	    var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
    	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if ($("#name").val() === "" || $("#name").val() === "Introduce tu nombre" ) {
			$("#name").focus().after("<span class='error'>Introduce tu nombre</span>");
			return false;
		}else if (!pname.test($("#name").val())) {
			$("#name").focus().after("<span class='error'>El nombre tiene un minimo de 3 caracteres</span>");
			return false;
		}
		if ($("#email").val() === "" || $("#email").val() === "Introduce tu email" ) {
			$("#email").focus().after("<span class='error'>Introduce tu email</span>");
			return false;
		}else if (!pmail.test($("#email").val())) {
			$("#email").focus().after("<span class='error'>El formato del mail es incorrecto</span>");
			return false;
		}
		if ($("#matter").val() === "Seleccione un asunto" ) {
			$("#matter").focus().after("<span class='error'>Seleccione un asunto</span>");
			return false;
		}
		if ($("#message").val() === "" || $("#message").val() === "Seleccione un asunto" ) {
			$("#message").focus().after("<span class='error'>Introduzca su mensaje</span>");
			return false;
		}
		if (result) {
			send_email({name:$("#name").val(), email:$("#email").val(), matter:$("#matter").val(), message:$("#message").val()});
		}
	});
}

function send_email(content_email) {
	
	ajaxPromise("POST","JSON",friendlyURL("?module=contact&op=send_contact_us"),content_email)
	.then(function(data){
		toastr.success('Correo enviado');
	}).catch(function(error, data) {
		toastr.error('Something happend when trying to send.' ,'Error');
	});
}

$(document).ready(function(){
	click_send_email();
	currentMenu("menu-contact");
});