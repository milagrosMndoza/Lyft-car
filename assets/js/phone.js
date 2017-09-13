'use strict';
const app1 = {
	item: {
		inputPhoneNumber: undefined,
	},
	init: function () {
		app1.item.inputPhoneNumber = $('#inputPhoneNumber');
		app1.item.inputPhoneNumber.on('keyup', app1.validatePhoneNumber);
		app1.item.inputPhoneNumber.on('keypress', app1.onlyNumbers);
		app1.item.inputPhoneNumber.on('keyup', app1.entryFormat);
		$('#btnNext').on('click', app1.generateCode);
		$('#goBack').on('click', app1.goBack);
		//Retreive your key on the local storage
		let getFlag = localStorage.getItem('country');
		let getDialCode = localStorage.getItem('dialCode');
		$('#flag').removeClass().addClass(getFlag);
		$('#dialCode').text(getDialCode);
	},
	goBack: function () {
		window.location = "index.html";
	},
	goForward: function () {
		window.location = "index-signup.html";
	},
	/* Envia Mensaje al usuario*/
	producePrompt: function (message, promptLocation, color) {
		$('#' + promptLocation).html(message);
		$('#' + promptLocation).css({
			"color": "color"
		});
	},
	/*Si otro cosa que no sea un número es presionado*/
	onlyNumbers: function (event) {
		let keycode = event.which;
		if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
			event.preventDefault();
		}
	},
	/*Valida número teléfonico*/
	validatePhoneNumber: function (event) {
		let phoneNumber = $('#inputPhoneNumber').val();
		if (phoneNumber == null || phoneNumber.length == 0 || /^\^s+$/g.test(phoneNumber)) {
			app1.producePrompt("No ingresaste tu número teléfonico", "commentPhonePrompt", "red");
			$('#glypcn').remove();
			$('#input-phone-group').attr("class", "input-group form-group has-error has-feedback");
			$('#input-phone-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		} else if (phoneNumber.length < 11 || phoneNumber.length > 11) {
			app1.producePrompt("Max 9 numeros", "commentPhonePrompt", "red");
			$('#glypcn').remove();
			$('#input-phone-group').attr("class", "input-group form-group has-error has-feedback");
			$('#input-phone-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
			return false;
		} else {
			app1.producePrompt("", "commentPhonePrompt", ""), $('#glypcn').remove();
			$('#input-phone-group').attr("class", "input-group form-group has-success has-feedback");
			$('#input-phone-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
			return true;
		}
	},
	/* Genera código */
	generateCode: function (event) {
		let phoneNumber = $('#inputPhoneNumber').val();
		let randomNumber = Math.floor(Math.random() * 900) + 99;
		let lab = "LAB-";
		let code = (lab + randomNumber);
		localStorage.setItem('codeLab', code);
		let mymodal = $('#myModal');
		app1.validatePhoneNumber;
		if (phoneNumber == null || phoneNumber.length == 0 || /^\^s+$/g.test(phoneNumber)) {
			alertify.alert("¡Número teléfonico invalido o vacío!");
			return false;
		} else {
			mymodal.find('.modal-title').text('¡Código Lyft ha sido generado exitosamente!');
			mymodal.find('.modal-body').text('Tu código único de usuario es: ' + code);
			mymodal.modal('show');
			$('#close').on('click', app1.goForward);
			return true;
		}
	}
}
$(document).ready(app1.init);
