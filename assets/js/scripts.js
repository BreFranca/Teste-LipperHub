'use-scrict';

var config = {
	apiKey: "AIzaSyCT1M3Fbz4M3iN3bVoc9jnAh98OGTjQcvQ",
	authDomain: "teste-lipperhub.firebaseapp.com",
	databaseURL: "https://teste-lipperhub.firebaseio.com",
	projectId: "teste-lipperhub",
	storageBucket: "teste-lipperhub.appspot.com",
	messagingSenderId: "1067565145692"
};
firebase.initializeApp(config);

$(window).on('load', function(){
	$('#loader').fadeOut('slow');
});

$('.btn-mobile').click(function(event) {
	$(this).toggleClass('active');
	$('header nav').slideToggle();
});

$('header nav ul li a').click(function(event) {
	$('.btn-mobile').removeClass('active');
	$('header nav').slideUp();
});

$('[data-service]').click(function(event) {
	event.preventDefault();
	nav = $(this).attr('data-service');
	$('.services').addClass('active');
	$('.services .service:not(.'+ nav +')').removeClass('active');
	$('.services .service.' + nav).addClass('active');
	$('.mask').show();
});

$('.mask').click(function(event) {
	closeNav();
});

function closeNav() {
	$('.mask').hide();
	$('.services').removeClass('active');
	$('.services .service').removeClass('active');
}

$(window).on('scroll', function() {
	var scroll = $(window).scrollTop();
	var banner = $('#banner').height();
	if(scroll > banner) {
		$('body').addClass('fixed-menu');
	} else {
		$('body').removeClass('fixed-menu');
	}
});


$('header nav ul li a').click(function(e) {
	var page = $(this).attr('href').replace('#', '/#/');
	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top - 50
			}, 800);
			return false;
		}
	}
});

/**
 * Formulário de Login e Senha
 */

// $('#form').submit(function(event) {
$('input[type="submit"').click(function(event) {
	/* Act on the event */
	event.preventDefault();
	// email = $(this).find('#email');
	// pass = $(this).find('#password');
	email = 'bre.sfranca@gmail.com';
	pass = '12345';

	firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// ...
	});
});