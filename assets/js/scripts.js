'use-scrict';

/*
 * FIREBASE INITIALIZE CONFIGS
 * -------------------------------------------------------- */
var config = {
	apiKey: "AIzaSyCT1M3Fbz4M3iN3bVoc9jnAh98OGTjQcvQ",
	authDomain: "teste-lipperhub.firebaseapp.com",
	databaseURL: "https://teste-lipperhub.firebaseio.com",
	projectId: "teste-lipperhub",
	storageBucket: "teste-lipperhub.appspot.com",
	messagingSenderId: "1067565145692"
};
firebase.initializeApp(config);

/*
 * LOADER
 * -------------------------------------------------------- */
$(window).on('load', function(){
	$('#loader').fadeOut('slow');
});

/*
 * MENU MOBILE
 * -------------------------------------------------------- */
$('.btn-mobile').click(function(event) {
	$(this).toggleClass('active');
	$('header nav').slideToggle();
});

$('header nav ul li a').click(function(event) {
	$('.btn-mobile').removeClass('active');
	$('header nav').slideUp();
});


/*
 * TABS SERVICE
 * -------------------------------------------------------- */
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

/*
 * FIXED MENU
 * -------------------------------------------------------- */
$(window).on('scroll', function() {
	var scroll = $(window).scrollTop();
	var banner = $('#banner').height();
	if(scroll > banner) {
		$('body').addClass('fixed-menu');
	} else {
		$('body').removeClass('fixed-menu');
	}
});

/*
 * ANCHOR MENU
 * -------------------------------------------------------- */
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

/*
 * MODAL
 * -------------------------------------------------------- */
$('.mask-modal').click(function() {
	fecharModal();
});

$('.fechar').click(function() {
	fecharModal();
});

function openModal() {
	$('#modal').fadeIn();
}

function fecharModal() {
	$('#modal').fadeOut();
}
/*
 * FORMS
 * -------------------------------------------------------- */
$('[data-form]').click(function(event) {
	/* Act on the event */
	event.preventDefault();
	form = $(this).attr('data-form');
	$('form').hide();
	$('#form-'+form).show();
});

function msgModal(msg) {
	$('#msg').html(msg);
	openModal();
}
// $('#form-login').submit(function(event) {
// $('input[type="submit"]').click(function(event) {
// 	event.preventDefault();
// 	firebase.auth().currentUser.updatePassword('123mudar')
// 	.then(function() {
// 		console.log('Senha Alterada');
// 	})
// 	.catch(function(error) {
// 		console.log(JSON.stringify( error ));
// 	}); 
// });

$('#form-login').submit(function(event) {
	event.preventDefault();
	email = $(this).find('#lemail').val();
	pass = $(this).find('#lpass').val();

	firebase.auth().signInWithEmailAndPassword('email@email.com.br', '123mudar')
	.then(function() {
		msgModal('Login Done');
		$('#form-login')[0].reset();
		$('#form-login').hide();
		$('#usuario').show();
	}).catch(function(error) { 
		// document.getElementById("console").innerHTML = JSON.stringify( error );
		console.log(JSON.stringify( error ));
	});
});

$('#form-register').submit(function(event) {
	event.preventDefault();
	email = $(this).find('#remail').val();
	pass = $(this).find('#rpass').val();

	firebase.auth().createUserWithEmailAndPassword(email, pass)
	.then(function(success){
		// console.log(JSON.stringify( success ));
		msgModal('User created successfully');
		$('#form-register')[0].reset();
		$('#form-register').hide();
		$('#form-login').show();
	}).catch(function(error) {
		msgModal(error.message);
	});
});