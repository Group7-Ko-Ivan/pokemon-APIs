const baseURL = 'http://localhost:3000'

function checkToken() {
  if (!localStorage.access_token) {
    $("#logoutBtn").hide()
    $("#registerBtn").show(500)
    $("#loginForm").show(500)
    $('#registerForm').hide()
  } else {
    $("#logoutBtn").show(500)
    $("#registerBtn").hide()
    $("#loginForm").hide()
    $('#registerForm').hide()
  }
}
function registerFormShow() {
  $("#logoutBtn").hide()
  $("#registerBtn").hide()
  $("#loginForm").hide()
  $("#registerForm").show(500)
}

function register() {
  const email = $('#registerEmail').val();
  const password = $('#registerPassword').val();
  const name = $('#registerName').val();

  $.ajax({
    url: baseURL + "/users/register",
    method: "POST",
    data: {
      name,
      email,
      password
    }
  })
    .done((response) => {
      $('#loginEmail').val(email)
      $('#loginPassword').val(password)
      login()
    })
    .fail((xhr, text) => {
      console.log({xhr, text});
    })
    .always(_ => {
      $('#registerEmail').val("")
      $('#registerPassword').val("")
      $('#registerName').val("")
    })
}


function login() {  
  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();

  $.ajax({
    url: baseURL + "/users/login",
    method: "POST",
    data: {
      email,
      password
    }
  })
    .done((response) => {
      localStorage.setItem("access_token",response.access_token)
      checkToken()
    })
    .fail((xhr, text) =>{
      console.log({xhr, text});
    })
    .always(_ => {
      $("#loginEmail").val("")
      $("#loginPassword").val("")
    })
}

function logout() {
  localStorage.removeItem("access_token")
  checkToken()
}


function onSignIn(googleUser) {
  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: baseURL + '/users/googleLogin',
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
    .done((response) => {
      localStorage.setItem("access_token",response.access_token)
      checkToken()
    })
    .fail((xhr, text) =>{
      console.log({xhr, text});
    })
}

$(document).ready(function(){
  checkToken()

  // --- Button Function
  
  $("a#homeBtn").on("click", (e) => {
    e.preventDefault()
    checkToken()
  })

  $("#logoutBtn").on("click", (e) => {
    e.preventDefault()
    logout()
  })

  $("#registerBtn").on("click", (e) => {
    e.preventDefault()
    registerFormShow()
  })
  $("#loginBtn").on("click", (e) => {
    e.preventDefault()
    checkToken()
  })

  //--- Form Function

  $("#loginForm").on("submit", (e) => {
    e.preventDefault()
    login()
  })

  $("#registerForm").on("submit", (e) => {
    e.preventDefault()
    register()
  })

});