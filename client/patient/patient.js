
//====================VARIABLES==========================
const loginInput = document.querySelector(".login");
const welcome = document.querySelector("#welcome");
const button = document.querySelector("#createBtn")

//=================LOGIN==============================
loginInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const login = { username: data.get("username"), password: data.get("password") };
    const { username, password } = login;
    console.log( username,  password)

    fetch("http://localhost:3000/patients", { 
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
    .then((data) => {
      const error = document.createElement('div');
            error.className = 'alert alert-danger';
            error.setAttribute("role", "alert");
            loginInput.prepend(error);
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === username && data[i].password === password) {
            fetch(`http://localhost:3000/patients/${data[i].id}`, { 
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "online": true
        })
      })
      .then(window.open("patient_profile.html"))
      location.reload()
        
          } else if (data[i].username === username || data[i].password === password){
            error.textContent = 'Incorrect Username and/or Password!';
            
          } else {
            error.innerHTML = 'Please enter Username and Password!';
          }
        };
        
    });
 }); 
 

button.addEventListener("click", () => {
  window.open("create_patient.html")
})