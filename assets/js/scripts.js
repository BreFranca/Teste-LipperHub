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

//escutando status do firebase
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		//online
		// document.getElementById("console").innerHTML = JSON.stringify( user );
		console.log(user);
		$('#form-login').hide();
		$('#usuario').show();
		$('#usuario').find('.email').html(user.email);
	} else {
		// document.getElementById("console").innerHTML = 'OffLine!';
		$('#usuario').hide();
		$('#form-login').show();
}
});

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
	if($(window).width() < 768) {
		$('header nav').slideUp();
	}
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
	$('#msg').html('');
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

$('#exit').click(function(event) {
	/* Act on the event */
	event.preventDefault();

	firebase.auth().signOut()
	.then(function() {
		// document.getElementById("console").innerHTML = 'Logout';
		msgModal('Logout');
		$('#usuario').show();
		$('#form-login').show();
	}, function(error) {
		// document.getElementById("console").innerHTML = JSON.stringify( error );
		msgModal(error.message);
	});
});

$('#form-login').submit(function(event) {
	event.preventDefault();
	email = $(this).find('#lemail').val();
	pass = $(this).find('#lpass').val();

	firebase.auth().signInWithEmailAndPassword(email, pass)
	.then(function() {
		msgModal('Login Done');
		$('#form-login')[0].reset();
		$('#form-login').hide();
		$('#usuario').show();
	}).catch(function(error) { 
		// document.getElementById("console").innerHTML = JSON.stringify( error );
		// console.log(JSON.stringify( error ));
		msgModal(error.message);
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