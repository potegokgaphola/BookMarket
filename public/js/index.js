// const firebase = require('firebase');

function showSignupForm() {
  $('#signup-form').removeClass('hidden');
  $('#login-form').addClass('hidden');
}

function showLoginForm() {
  $('#signup-form').addClass('hidden');
  $('#login-form').removeClass('hidden');
}

$(() => {
  const lastform = sessionStorage.getItem('lastform');
  if (lastform === 'signup') {
    showSignupForm();
  } else {
    showLoginForm();
  }
});

$('#signup-a-btn').click((event) => {
  event.preventDefault();
  showSignupForm();
  sessionStorage.setItem('lastform', 'signup');
});

$('#login-btn').click(async (event) => {
  event.preventDefault();
  const email = document.getElementById('login-username');
  const password = document.getElementById('login-password');

  try {
    await auth.signInWithEmailAndPassword(email.value, password.value);
    $.ajax({
      type: 'GET',
      url: '/home',
      success() {
        console.info(`User ${email.value} has logged in`);
      },
    });
  } catch (error) {
    console.error(error);
  }
});

$('#signup-btn').click(async (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-unused-vars
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('signp-username');
  const password = document.getElementById('signup-password');
  const confirmpassword = document.getElementById('confirm-password');

  try {
    // await auth.createUserWithEmailAndPassword(email.value, password.value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    showLoginForm();
    sessionStorage.setItem('lastform', 'login');
  }
});

function signOut() {
  // auth.signOut();
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDaZPkHZHF07NxYfmTxtnKi0t0N4ozaGlg',
  authDomain: 'bookmarket-b87b9.firebaseapp.com',
  databaseURL: 'https://bookmarket-b87b9.firebaseio.com',
  projectId: 'bookmarket-b87b9',
  storageBucket: 'bookmarket-b87b9.appspot.com',
  messagingSenderId: '67210480007',
  appId: '1:67210480007:web:385b1c328dc0ec4966eb22',
  measurementId: 'G-02HGWR23T6',
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const auth = firebase.auth();
