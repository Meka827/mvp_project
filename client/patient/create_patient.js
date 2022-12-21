const loginInput = document.querySelector(".creating")

console.log('hi')

 
const welcome = document.querySelector("#welcome");
const button = document.querySelector("#createBtn")

//=================LOGIN==============================
loginInput.addEventListener("submit", (event) => {
    event.preventDefault();
  const data = new FormData(event.target);
  const login = { 
    first_name: data.get("first_name"), 
    last_name: data.get("last_name"), 
    date_of_birth: data.get("date_of_birth"), 
    username: data.get("username"), 
    password: data.get("password"), 
    confirm: data.get("confirm") 
  };
  const { first_name, last_name, date_of_birth, username, password, confirm } = login;
  const first = first_name.toLowerCase();
  const last = last_name.toLowerCase();
  console.log( first, last, date_of_birth, username, password, confirm )


    fetch("http://localhost:3000/patients", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        "first_name": `${first}`,
         "last_name": `${last}`, 
         "date_of_birth": `${date_of_birth}`, 
         "username": `${username}`, 
         "password": `${password}`, 
         "email": `${email}`, 
         "online": false
      })
  })
  .then((res) => res.json())
  .then((data) => {
      alert('Profile has been created and email will be sent');
      window.close();
                                  
  });

 }); 
 

// button.addEventListener("click", () => {
//   window.open("create_patient.html")
// })
// creating.addEventListener("submit", (event) => {
// event.preventDefault()


//   const data = new FormData(event.target);
//   const login = { 
//     first_name: data.get("first_name"), 
//     last_name: data.get("last_name"), 
//     date_of_birth: data.get("date_of_birth"), 
//     username: data.get("username"), 
//     password: data.get("password"), 
//     confirm: data.get("confirm") 
//   };
//   const { first_name, last_name, date_of_birth, username, password, confirm } = login;
//   console.log( first_name, last_name, date_of_birth, username, password, confirm )

//   // fetch("http://localhost:3000/patients", {
//   //   method: 'POST',
//   //   headers: {
//   //     "Content-Type": "application/json"
//   //     },
//   //     // body: JSON.stringify({ 
//   //     //   "first_name",
//   //     //    "last_name", 
//   //     //    "date_of_birth", 
//   //     //    "username", 
//   //     //    "password", 
//   //     //    "email", 
//   //     //    "online"
//   //     // })
//   // })
//   // .then((res) => res.json())
//   // .then((data) => {
//   //     console.log(data);
                                  
//   // });
// })