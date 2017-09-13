$(document).on('ready', init);
var inputPhoneNumber = $('#inputPhoneNumber');

function init() {
	$('#inputPhoneNumber').on('keyup', validatePhoneNumber);
	$('#inputPhoneNumber').on('keypress', onlyNumbers);
	$('#inputPhoneNumber').on('keyup', entryFormat);
	$('#btnNext').on('click', generateCode);
	$('#goBack').on('click', goBack);
	//Retreive your key on the local storage
	var getFlag = localStorage.getItem('country');
	var getDialCode = localStorage.getItem('dialCode');
	$('#flag').removeClass().addClass(getFlag);
	$('#dialCode').text(getDialCode);
}

function goBack() {
	window.location = "index.html";
}

function goForward() {
	window.location = "index-signup.html";
}
/* Envia Mensaje al usuario*/
function producePrompt(message, promptLocation, color) {
	$('#' + promptLocation).html(message);
	$('#' + promptLocation).css({
		"color": "color"
	});
}
/*Si otro cosa que no sea un número es presionado*/
function onlyNumbers(event) {
	var keycode = event.which;
	if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
		event.preventDefault();
	}
}
/*Se permite solo 10 números en formato*/
function entryFormat(event) {
	var len = this.value.length;
	if (len == 3 || len == 7 || len == 12) {
		$(this).val(this.value + " ");
	} else if (len == 15) {
		$(this).val(this.value + " ");
	}
}
/*Valida número teléfonico*/
function validatePhoneNumber(event) {
	var phoneNumber = inputPhoneNumber.val();
	if (phoneNumber == null || phoneNumber.length == 0 || /^\^s+$/g.test(phoneNumber)) {
		producePrompt("No ingresaste tu número teléfonico", "commentPhonePrompt", "red");
		$('#glypcn').remove();
		$('#input-phone-group').attr("class", "input-group form-group has-error has-feedback");
		$('#input-phone-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	} else if (phoneNumber.length < 11 || phoneNumber.length > 11) {
		producePrompt("Max 9 numeros", "commentPhonePrompt", "red");
		$('#glypcn').remove();
		$('#input-phone-group').attr("class", "input-group form-group has-error has-feedback");
		$('#input-phone-group').append("<i id='glypcn' class='fa fa-times form-control-feedback'></i>");
		return false;
	} else {
		producePrompt("", "commentPhonePrompt", "");
		$('#glypcn').remove();
		$('#input-phone-group').attr("class", "input-group form-group has-success has-feedback");
		$('#input-phone-group').append("<i id='glypcn' class='fa fa-check form-control-feedback'></i>");
		return true;
	}
}
/* Genera código */
function generateCode(event) {
	var phoneNumber = inputPhoneNumber.val();
	var randomNumber = Math.floor(Math.random() * 900) + 99;
	var lab = "LAB-";
	var code = (lab + randomNumber);
	localStorage.setItem('codeLab', code);
	var mymodal = $('#myModal');
	validatePhoneNumber();
	if (validatePhoneNumber) {
		if (phoneNumber == null || phoneNumber.length == 0 || /^\^s+$/g.test(phoneNumber) || phoneNumber.length < 11 || phoneNumber.length > 11) {
			alertify.alert("¡No ingresaste número teléfonico, o tu número telefónico es inválido!");
		} else {
			mymodal.find('.modal-title').text('¡Código Lyft ha sido generado exitosamente!');
			mymodal.find('.modal-body').text('Tu código único de usuario es: ' + code);
			mymodal.modal('show');
			$('#close').on('click', goForward);
		}
	} else {
		event.preventDefault();
		mymodal.find('.modal-title').text('¡Número teléfonico invalido!');
		mymodal.find('.modal-body').text('Ingresa un teléfono válido según tu pais');
		mymodal.modal('show');
	}
}
