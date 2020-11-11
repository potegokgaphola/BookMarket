$(function() {
    const lastform = sessionStorage.getItem('lastform');
    if (lastform === 'signup') {
        showSignupForm();
    } else {
        showLoginForm();
    }
})

$('#test').click(function() {
    location.replace('login-page/login.html')
})

$("#signup-a-btn").click(function(event) {
    event.preventDefault();
    showSignupForm();
    sessionStorage.setItem('lastform', 'signup');
})

$("#signup-btn").click(function(event) {
    event.preventDefault();
    showLoginForm();
    sessionStorage.setItem('lastform', 'login');
})

function showSignupForm() {
    $('#signup-form').removeClass('hidden');
    $('#login-form').addClass('hidden');
}

function showLoginForm() {
    $('#signup-form').addClass('hidden');
    $('#login-form').removeClass('hidden');
}