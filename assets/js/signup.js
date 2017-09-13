$(document).on('ready', init);

$('span'.helpblock)

function init()
{
	$('#commentName').on('keyup', validateName);
	$('#commentLastName').on('keyup', validateLastName);
	$('#commentEmail').on('keyup', validateEmail);
	$('#commentInfo').on('keyup', validateInfo);
	$('#btnValidation').on('click', validateForm);
	$('#btnGoBack').on('click', goBack);
}

function goBack()
{
	window.location="index-phone.html";
}

function validateForm()
{
	var inputName=$('#commentName').val();
    localStorage.setItem('Name', inputName);

  	var inputLastName=$('#commentLastName').val();
  	localStorage.setItem('LastName',inputLastName);

  	var inputEmail=$('#commentEmail').val();
  	localStorage.setItem('Email', inputEmail);

  	validateName(); validateLastName(); validateEmail();

    if (validateName()==false || validateLastName()==false || validateEmail()==false || validateInfo()==false)
	{
		jsShow("commentPrompt");
		producePrompt("Formulario debe estar validado para poder registrarte", "commentPrompt", "red");
		$('#commentPrompt').attr("class", "alert alert-danger text-center");
		$('#commentPrompt').append("<button class='close btn btn-primary text-center' data-dismiss='alert' aria-label='Close'>"+"<span>&times</span></button>");
		setTimeout(function(){jsHide("commentPrompt");}, 3000);
		
	}	
	else
	{
		jsShow("commentPrompt");
		producePrompt("Formulario Validado Exitósamente", "commentPrompt", "green");
		$('#commentPrompt').attr("class", "alert alert-success text-center");
		$('#commentPrompt').append("<button class='close btn btn-primary text-center' data-dismiss='alert' aria-label='Close'>"+"<span>&times</span></button>");
		setTimeout(function(){jsHide("commentPrompt");}, 3000);
		
		window.location="index-map.html";
	}
}

/* Muestra mensaje validación*/
function jsShow(id)
{
	$('#' + id).show();
}

/* Oculta mensaje validación*/
function jsHide(id)
{
	$('#' + id).hide();
}

/* Envia Mensaje al usuario*/
function producePrompt(message, promptLocation, color)
{
    $('#' + promptLocation).html(message) ;
	$('#' + promptLocation).css({"color":"color"});
}

/* Convierte en mayuscula la primera letra de una palabra*/
function firstToUpperCase(_texto)
{
	var result = _texto[0].toUpperCase() + _texto.slice(1);
	var mayus = result.split(" ");
	return result;
}

/* Valida Nombre*/
function validateName()
{
    var inputName = $('#commentName');
	//var name =  inputName.val();
	var name = firstToUpperCase(inputName.val()) ;
	var nameReg = /^[A-Z][a-z]*[a-zA-Z]$/;
	
	if (name == null || name.length == 0 || /^\^s+$/g.test(name))
	{
		producePrompt("Tu Nombre es requerido", "commentNamePrompt", "red");
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-error has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	}
	else if (!nameReg.test(name)) 
	{
		producePrompt("Compruebe que su Nombre contenga SOLO caracteres de la A-Z", "commentNamePrompt", "red");
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-error has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	}
	else 
	{
		producePrompt("Nombre Válido ✔", "commentNamePrompt", "green")
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-success has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
		return true;
	}	


}

/* Valida Apellido*/
function validateLastName()
{
	var inputLastName = $('#commentLastName');
	//var lastName =  inputLastName.val();
	var lastName = firstToUpperCase(inputLastName.val()) ;
	var lastNameReg = /^[A-Z][a-z]*[a-zA-Z]$/;

	if (lastName == null || lastName.length == 0 || /^\^s+$/.test(lastName))
	{
		producePrompt("Tu Apellido es requerido", "commentLastNamePrompt", "red");
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-error has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	}
	else if (!lastNameReg.test(lastName)) 
	{
		producePrompt("Compruebe que su Apellido contenga SOLO caracteres de la A-Z", "commentLastNamePrompt", "red");
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-error has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	}
	else 
	{
		producePrompt("Apellido Válido ✔", "commentLastNamePrompt", "green");
		$('#glypcn').remove();
		$('#input-name-group').attr("class", "form-group has-success has-feedback");
		$('#input-name-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
		return true;
	}	
}

/* Valida Email*/
function validateEmail()
{
	var inputEmail = $('#commentEmail');
	var email = inputEmail.val();
	var emailReg = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

	if (email == null || email.length == 0 || /^\s+$/.test(email))
	{
		producePrompt("Correo Electrónico es requerido", "commentEmailPrompt", "red");
		$('#glypcn').remove();
		$('#input-email-group').attr("class", "form-group has-error has-feedback");
		$('#input-email-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");

		return false;
	}
	else if (!emailReg.test(email)) 
	{
		producePrompt("Compruebe que el Correo Electrónico contenga un formato válido. Ej: name@domain.com", "commentEmailPrompt", "red");
		$('#glypcn').remove();
		$('#input-email-group').attr("class", "form-group has-error has-feedback");
		$('#input-email-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	}
	else 
	{
		producePrompt("Correo Electrónico Válido ✔", "commentEmailPrompt", "green");
		$('#glypcn').remove();
		$('#input-email-group').attr("class", "form-group has-success has-feedback");
		$('#input-email-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
		return true;
	}
}

/* Valida Terminos */
function validateInfo()
{
	var info = $('#commentInfo');
	if (info.prop('checked')) 
	{
		producePrompt("¡Gracias por aceptar los Terminos de Usuario!", "commentInfoPrompt", "green");
		return true;
	}
	else
	{
		return false;
	}
}