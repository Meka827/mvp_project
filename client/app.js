// fetch("http://localhost:3000/patients")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// });


//NOTES=============
//add email;


$(document).ready(function() {
    $(window).on('scroll', function() {
     if($(window).scrollTop() < 1000) {
       $('.hero').css('background-size', 130 + parseInt($(window).scrollTop() / 5) + '%');
       $('.hero h1').css('top', 50 + ($(window).scrollTop() * .1) + '%');
       $('.hero h1').css('opacity', 1 - ($(window).scrollTop() * .003));
     }
      
      if($(window).scrollTop() >= $('.content-wrapper').offset().top - 300) {
        $('.nav-bg').removeClass('bg-hidden');
        $('.nav-bg').addClass('bg-visible');
      } else {
        $('.nav-bg').removeClass('bg-visible');
        $('.nav-bg').addClass('bg-hidden');
      }
   });
 });
 



// fetch("http://localhost:3000/providers")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// });

// fetch("http://localhost:3000/screens")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// });

// const loginInput = document.querySelector(".login");
// loginInput.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const data = new FormData(event.target);
//     const login = { username: data.get("username"), password: data.get("password") };
//     console.log("data", login)
// });


//   fetch("http://localhost:3000/patients/auth", {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         "username": "michelle.obama",
//         "password": "obama69"
//       })
//   })
//   .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// });
