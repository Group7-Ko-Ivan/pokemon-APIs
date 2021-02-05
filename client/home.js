const baseURL = 'http://localhost:3000'

function checkToken() {
  if (!localStorage.access_token) {
    $("#logoutBtn").hide()
    $("#wheretoBtn").hide()
    $("#loginBtn").show(500)
    $("#registerBtn").show(500)
    $("#notLogin").show(500)
    $('#registerForm').hide()
    $("#loginForm").hide()
    $('#tcgList').hide()
    $('#afterLogin').hide()
    
  } else {
    $("#logoutBtn").show(500)
    $("#wheretoBtn").show(500)
    $("#afterLogin").show(500)
    $("#loginBtn").hide()
    $("#registerBtn").hide()
    $("#loginForm").hide()
    $("#notLogin").hide()
    $('#registerForm').hide()
    $('#tcgList').hide()
  }
}
function registerFormShow() {
  $("#notLogin").hide()
  $("#logoutBtn").hide()
  $("#registerBtn").hide()
  $("#loginBtn").show(500)
  $("#loginForm").hide()
  $("#wheretoBtn").hide()
  $("#registerForm").show(500)
  $("#afterLogin").hide()
}
function loginFormShow() {
  $("#notLogin").hide()
  $("#logoutBtn").hide()
  $("#registerBtn").show(500)
  $("#wheretoBtn").hide()
  $("#registerForm").hide()
  $("#loginBtn").hide()
  $("#loginForm").show(500)
  $("#afterLogin").hide()
}

function register() {
  const email = $('#registerForm #email').val();
  const password = $('#registerForm #password').val();
  const name = $('#registerForm #name').val();


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
     checkToken()
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
  const email = $("#loginForm #email").val()
  const password = $("#loginForm #password").val()

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
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
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

function getTcg() {
  $('#afterLogin').hide()
  $('#tcgContainer').empty()
  $.ajax({
    method: 'GET',
    url: baseURL + "/pokedex/currency",
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((response) => {
      let cards = response.slice()
      cards.forEach(card => {
        $('#tcgContainer').append(`<aside>
				<img class="tcg" src="${card.image}"/>
                <h3>${card.name}</h3>
                <p>Rp. ${card.price},00</p>
            </aside>`)
      })
      $('#tcgList').show(500)
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
    })
}

function getPokemon() {
  $('#afterLogin').hide()
  $('#tcgContainer').empty()
  $.ajax({
    method: 'GET',
    url: baseURL + "/pokedex/pokemon",
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
    .done((response) => {
      let cards = response.output
      cards.forEach(card => {
        card.name = card.name[0].toUpperCase() + card.name.slice(1)
        $('#tcgContainer').append(`<aside>
				<img class="tcg" src="${card.image}"/>
                <h3>${card.name}</h3>
            </aside>`)
      })
      $('#tcgList').show(500)
    })
    .fail((xhr, text) => {
      console.log(xhr, text);
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

  $("p #register").on("click", (e) => {
    e.preventDefault()
    registerFormShow()
  })
  $("p #login").on("click", (e) => {
    e.preventDefault()
    loginFormShow()
  })
  $("#registerBtn").on("click", (e) => {
    e.preventDefault()
    registerFormShow()
  })
  $("#loginBtn").on("click", (e) => {
    e.preventDefault()
    loginFormShow()
  })
  $("#tcgBtn").on("click", (e) => {
    e.preventDefault()
    getTcg()
  })
  $("#pokeBtn").on("click", (e) => {
    e.preventDefault()
    getPokemon()
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