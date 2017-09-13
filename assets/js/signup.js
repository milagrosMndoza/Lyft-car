'use strict';
const app3 = {
	item: {
		span: $('span'.helpblock)
	, }
	, init: function () {
		$('#commentName').on('keyup', app3.validateName);
		$('#commentLastName').on('keyup', app3.validateLastName);
		$('#commentEmail').on('keyup', app3.validateEmail);
		$('#commentInfo').on('keyup', app3.validateInfo);
		$('#btnValidation').on('click', app3.validateForm);
		$('#btnGoBack').on('click', app3.goBack);
	}
	, goBack: function () {
		window.location = "index-phone.html";
	}
	, validateForm: function () {
		let inputName = $('#commentName').val();
		localStorage.setItem('Name', inputName);
		let inputLastName = $('#commentLastName').val();
		localStorage.setItem('LastName', inputLastName);
		let inputEmail = $('#commentEmail').val();
		localStorage.setItem('Email', inputEmail);
		app3.validateName();
		app3.validateLastName();
		app3.validateEmail();
		if (app3.validateName() == false || app3.validateLastName() == false || app3.validateEmail() == false || app3.validateInfo() == false) {
			app3.jsShow("commentPrompt");
			producePrompt("Formulario debe estar validado para poder registrarte", "commentPrompt", "red");
			$('#commentPrompt').attr("class", "alert alert-danger text-center");
			$('#commentPrompt').append("<button class='close btn btn-primary text-center' data-dismiss='alert' aria-label='Close'>" + "<span>&times</span></button>");
			setTimeout(function () {
				jsHide("commentPrompt");
			}, 3000);
		}
		else {
			app3.jsShow("commentPrompt");
			app3.producePrompt("Formulario Validado Exitósamente", "commentPrompt", "green");
			$('#commentPrompt').attr("class", "alert alert-success text-center");
			$('#commentPrompt').append("<button class='close btn btn-primary text-center' data-dismiss='alert' aria-label='Close'>" + "<span>&times</span></button>");
			setTimeout(function () {
				jsHide("commentPrompt");
			}, 3000);
			window.location = "index-map.html";
		}
	}
	, /* Muestra mensaje validación*/
	jsShow: function (id) {
		$('#' + id).show();
	}
	, /* Oculta mensaje validación*/
	jsHide: function (id) {
		$('#' + id).hide();
	}
	, /* Envia Mensaje al usuario*/
	producePrompt: function (message, promptLocation, color) {
		$('#' + promptLocation).html(message);
		$('#' + promptLocation).css({
			"color": "color"
		});
	}
	, /* Convierte en mayuscula la primera letra de una palabra*/
	firstToUpperCase: function (_texto) {
		let result = _texto[0].toUpperCase() + _texto.slice(1);
		let mayus = result.split(" ");
		return result;
	}
	, /* Valida Nombre*/
	validateName: function () {
		let inputName = $('#commentName');
		//let name =  inputName.val();
		let name = app3.firstToUpperCase(inputName.val());
		let nameReg = /^[A-Z][a-z]*[a-zA-Z]$/;
		if (name == null || name.length == 0 || /^\^s+$/g.test(name)) {
			app3.producePrompt("Tu Nombre es requerido", "commentNamePrompt", "red");
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-error has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else if (!nameReg.test(name)) {
			app3.producePrompt("Compruebe que su Nombre contenga SOLO caracteres de la A-Z", "commentNamePrompt", "red");
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-error has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else {
			app3.producePrompt("Nombre Válido ✔", "commentNamePrompt", "green")
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-success has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
			return true;
		}
	}
	, /* Valida Apellido*/
	validateLastName: function () {
		let inputLastName = $('#commentLastName');
		//let lastName =  inputLastName.val();
		let lastName = app3.firstToUpperCase(inputLastName.val());
		let lastNameReg = /^[A-Z][a-z]*[a-zA-Z]$/;
		if (lastName == null || lastName.length == 0 || /^\^s+$/.test(lastName)) {
			app3.producePrompt("Tu Apellido es requerido", "commentLastNamePrompt", "red");
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-error has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else if (!lastNameReg.test(lastName)) {
			app3.producePrompt("Compruebe que su Apellido contenga SOLO caracteres de la A-Z", "commentLastNamePrompt", "red");
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-error has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else {
			app3.producePrompt("Apellido Válido ✔", "commentLastNamePrompt", "green");
			$('#glypcn').remove();
			$('#input-name-group').attr("class", "form-group has-success has-feedback");
			$('#input-name-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
			return true;
		}
	}
	, /* Valida Email*/
	validateEmail: function () {
		let inputEmail = $('#commentEmail');
		let email = inputEmail.val();
		let emailReg = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
		if (email == null || email.length == 0 || /^\s+$/.test(email)) {
			app3.producePrompt("Correo Electrónico es requerido", "commentEmailPrompt", "red");
			$('#glypcn').remove();
			$('#input-email-group').attr("class", "form-group has-error has-feedback");
			$('#input-email-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else if (!emailReg.test(email)) {
			app3.producePrompt("Compruebe que el Correo Electrónico contenga un formato válido. Ej: name@domain.com", "commentEmailPrompt", "red");
			$('#glypcn').remove();
			$('#input-email-group').attr("class", "form-group has-error has-feedback");
			$('#input-email-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		}
		else {
			app3.producePrompt("Correo Electrónico Válido ✔", "commentEmailPrompt", "green");
			$('#glypcn').remove();
			$('#input-email-group').attr("class", "form-group has-success has-feedback");
			$('#input-email-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
			return true;
		}
	}
	, /* Valida Terminos */
	validateInfo: function () {
		let info = $('#commentInfo');
		if (info.prop('checked')) {
			app3.producePrompt("¡Gracias por aceptar los Terminos de Usuario!", "commentInfoPrompt", "green");
			return true;
		}
		else {
			return false;
		}
	}
}
$(document).ready(app3.init);