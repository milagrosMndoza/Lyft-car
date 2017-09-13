'use strict';
const app2 = {
	init: function () {
		var countryContainer = $('#countriesID');
		var countries = '[{"name":"Chile","dial_code":"+56","code":"CL"},{"name":"Mexico","dial_code":"+52","code":"MX"},{"name":"Peru","dial_code":"+51","code":"PE"}]';
		var eachCountry = $.parseJSON(countries);
		$.each(eachCountry, function () {
			var listHTML = '<a href="index-phone.html"><li select=""><div class="flag ' + this.code.toLowerCase() + '"' + ' style="padding-right:10px;">' + '</div>' + '<span class="dial_code"' + ' style="display:none;">' + this.dial_code + '</span>' + this.name + '</li></a>';
			countryContainer.append(listHTML);
		});
		app2.addedEventClick();
	},
	addedEventClick: function () {
		let countryList = Array.from($('#countriesID>a>li'));
		$.each(countryList, function () {
			$(this).on('click', app2.getCountry)
		});
	},
	getCountry: function (e) {
		var countryFlag = $(e.currentTarget).find('div').attr('class');
		localStorage.setItem('country', countryFlag);
		var countryDialCode = $(e.currentTarget).find('.dial_code').text();
		localStorage.setItem('dialCode', countryDialCode);
	}
}
$(document).ready(app2.init);
