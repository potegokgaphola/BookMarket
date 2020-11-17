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

$("#login-btn").click(async function(event) {
    event.preventDefault();
    const email = document.getElementById('login-username');
    const password = document.getElementById('login-password');

    try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        $.ajax({
            type: 'GET',
            url: '/home',
            success: function() {
                console.info(`User ${email.value} has logged in`);
            }
        })
    } catch (error) {
        console.error(error);
    } 
})

$("#signup-btn").click(async function(event) {
    event.preventDefault();
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('signp-username');
    const password = document.getElementById('signup-password');
    const confirmpassword = document.getElementById('confirm-password');

    try {
        await auth.createUserWithEmailAndPassword(email.value, password.value);
    } catch (error) {
        console.error(error);
    } finally {
        showLoginForm();
        sessionStorage.setItem('lastform', 'login');
    }
})

function showSignupForm() {
    $('#signup-form').removeClass('hidden');
    $('#login-form').addClass('hidden');
}

function showLoginForm() {
    $('#signup-form').addClass('hidden');
    $('#login-form').removeClass('hidden');
}

function signOut() {
    auth.signOut();
}


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyDaZPkHZHF07NxYfmTxtnKi0t0N4ozaGlg",
authDomain: "bookmarket-b87b9.firebaseapp.com",
databaseURL: "https://bookmarket-b87b9.firebaseio.com",
projectId: "bookmarket-b87b9",
storageBucket: "bookmarket-b87b9.appspot.com",
messagingSenderId: "67210480007",
appId: "1:67210480007:web:385b1c328dc0ec4966eb22",
measurementId: "G-02HGWR23T6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
