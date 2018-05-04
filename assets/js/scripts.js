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

//Escutando status do Firebase
usuario = document.querySelector('#usuario');
login = document.querySelector('#form-login');
register = document.querySelector('#form-register');

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		login.classList.remove('active');
		usuario.classList.add('active');
		$('#usuario').find('.email').html(user.email);
	} else {
		usuario.classList.remove('active');
		login.classList.add('active');
}
});

/*
 * LOADER
 * -------------------------------------------------------- */
window.onload = function() {
	document.querySelector('#loader').classList.add('hidden');
};

/*
 * MENU MOBILE
 * -------------------------------------------------------- */ 
const btn_mobile = document.querySelector('.btn-mobile');
btn_mobile.addEventListener("click",function(){
	this.classList.toggle('active');
	document.querySelector('header nav').classList.toggle('active');
});


/*
 * TABS SERVICE
 * -------------------------------------------------------- */
const mask = document.querySelector('.mask');
const services = document.querySelector('.services');
const service = document.querySelector('.service');
$('[data-service]').click(function(event) {
	event.preventDefault();
	nav = this.getAttribute('data-service');
	services.classList.add('active');
	services.querySelector('.service.' + nav).classList.add('active');
	services.querySelector('.service:not(.'+ nav +')').classList.remove('active');
	mask.classList.add('active');
});

mask.addEventListener("click",function(){
	closeNav();
});

function closeNav() {
	mask.classList.remove('active');
	services.classList.remove('active');
	services.querySelector('.service01').classList.remove('active');
	services.querySelector('.service02').classList.remove('active');
	services.querySelector('.service03').classList.remove('active');
}

/*
 * FIXED MENU
 * -------------------------------------------------------- */
body = document.querySelector('body');
window.addEventListener('scroll', function() {
	var element = document.querySelector("html");
	var scroll = element.scrollTop;
	var banner = $('#banner').height();
	if(scroll > banner) {
		body.classList.add('fixed-menu');
	} else {
		body.classList.remove('fixed-menu');
	}
});

/*
 * ANCHOR MENU
 * -------------------------------------------------------- */
$('header nav ul li a').click(function(e) {
	var page = $(this).attr('href').replace('#', '/#/');
	if($(window).width() < 768) {
		$('.btn-mobile').removeClass('active');
		$('header nav').slideUp();
	}
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
const modal = document.querySelector('#modal');
document.querySelector('.mask-modal').addEventListener("click",function(){
	fecharModal();
});

document.querySelector('.fechar').addEventListener("click",function(){
	fecharModal();
});

function openModal() {
	modal.classList.add('active');
}

const msg = document.querySelector('#msg');
function fecharModal() {
	modal.classList.remove('active');
}
/*
 * FORMS
 * -------------------------------------------------------- */
$('[data-form]').click(function(event) {
	event.preventDefault();
	form = $(this).attr('data-form');
	$('form').removeClass('active');
	$('#form-'+form).addClass('active');
});

function msgModal(message) {
	msg.innerHTML = message;
	openModal();
}

document.querySelector('#exit').addEventListener("click",function(event){
	event.preventDefault();

	firebase.auth().signOut()
	.then(function() {
		msgModal('Logout');
		usuario.classList.remove('active');
		// login.classList.add('active');
		location.reload();
	}, function(error) {
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
		msgModal(error.message);
	});
});

$('#form-register').submit(function(event) {
	event.preventDefault();
	email = $(this).find('#remail').val();
	pass = $(this).find('#rpass').val();

	firebase.auth().createUserWithEmailAndPassword(email, pass)
	.then(function(success){
		msgModal('User created successfully');
		$('#form-register')[0].reset();
		$('#form-register').hide();
		$('#form-login').show();
	}).catch(function(error) {
		msgModal(error.message);
	});
});