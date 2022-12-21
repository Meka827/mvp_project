
//====================VARIABLES==========================
const loginInput = document.querySelector(".login");
const welcome = document.querySelector("#welcome");

//=================LOGIN==============================
loginInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const login = { username: data.get("username"), password: data.get("password") };
    const { username, password } = login;
    console.log(data)

  fetch("http://localhost:3000/providers/auth", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "username": `${username}`,
          "password": `${password}`
        })
    })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);   
    window.open("provider_profile.html")
  });
}); 
 

// client/