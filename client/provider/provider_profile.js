
const formInput = document.querySelector("#input");
const outputData = document.querySelector("#output_data");
const providerSelect = document.querySelector(".provider-select");
const patientSelect = document.querySelector(".patient-select");
const proValue = document.querySelector('#provider');
const patValue = document.querySelector('#patient');

const meds = document.querySelector(".meds");
const visit = document.querySelector(".visit");


//=============Welcome==================

fetch("http://localhost:3000/providers")
.then((res) => res.json())
.then((userData) => {
    userData.forEach((object) => {
        let { first_name, last_name } = object;
        const first = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        const last = last_name.charAt(0).toUpperCase() + last_name.slice(1);
        let option = document.createElement('option');
        option.setAttribute("value", `${first_name} ${last_name}`);
        option.textContent = `${first} ${last}`;
        providerSelect.append(option);
        option.addEventListener("select", () => {
            option.setAttribute("selected");
        })
    })
});
fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((userData) => {
    userData.forEach((object) => {
        let { first_name, last_name } = object;
        const first = first_name.charAt(0).toUpperCase() + first_name.slice(1);
        const last = last_name.charAt(0).toUpperCase() + last_name.slice(1);
        let option = document.createElement('option');
        option.setAttribute("value", `${first} ${last}`);
        option.textContent = `${first} ${last}`;
        patientSelect.append(option);
        option.addEventListener("select", () => {
        option.setAttribute("selected");
        })
    })
});


//=================SUBMIT=====================================
formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const login = { date: data.get("date"), fullName: data.get("name"), patient: data.get("patient"), weight: data.get("weight"), height: data.get("height") };
    const { date, weight, height } = login;
    let value_pat = patValue.value.toLowerCase();
    let val_pro = proValue.value.toLowerCase();
    console.log(value_pat);
    let split =val_pro.split(' ');
    let name = { first_name: split[0], last_name: split[1]};
    let split2 =value_pat.split(' ');
    let patientName = { first_name: split2[0], last_name: split2[1]};

    fetch("http://localhost:3000/providers")
    .then((res) => res.json())
    .then((userData) => {
        for (let user in userData) {
            if (name.first_name === userData[user].first_name && name.last_name === userData[user].last_name) {
                fetch("http://localhost:3000/patients")
                    .then((res) => res.json())
                    .then((patientData) => {
                        for (let client in patientData) {
                            if (name.first_name === patientData[client].first_name && name.last_name === patientData[client].last_name) {
                            console.log(patientData[client].id)
                            
                                fetch("http://localhost:3000/screen", {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ 
                                        "date": `${date}`,
                                        "patient_id": `${patientData[client].id}`,
                                        "height": Number(height),
                                        "weight": Number(weight),
                                        "provider_id": `${userData[user].id}`
                                    })
                                })
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log(data);
                                    
                                });
                        }
                    }
                })
            }
        }
    });



   // sql`INSERT INTO screens (date, patient_id, height, weight, provider_id) 
     //fetch("http://localhost:3000/providers", {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         "username": `${username}`,
    //         "password": `${password}`
    //       })
    //   })
    //   .then((res) => res.json())
    // .then((data) => {
    //     console.log(data);
    //     window.open("provider_profile.html")
    // });
 }); 

//==========VISITS=======================

    // fetch(`http://localhost:3000/screens/${userData[0].id}`)
    // .then((res) => res.json())
    // .then((userSreen) => {
    //     for(let check in userSreen) {
    //         for(let data in userSreen[check]){
    //             if(data === 'date'){
    //                 let date = userSreen[check][data].slice(0, 10);
    //                 let dateARR = date.split('-');
    //                 let slashDate = `${dateARR[1]}/${dateARR[2]}/${dateARR[0]}`
    //                 let div = document.createElement("div");
    //                 div.textContent = slashDate;
    //                 visit.append(div);
    //             } else if(data === 'weight' || data === 'height') {
    //                 let div = document.createElement("div");
    //                 div.textContent = userSreen[check][data];
    //                 visit.append(div);
    //             } else if (data === 'provider_id') {
    //                 console.log(data, userSreen[check][data])
    //                 fetch(`http://localhost:3000/providers/${userSreen[check][data]}`)
    //                 .then((res) => res.json())
    //                 .then((result) => {
    //                     let div = document.createElement("div");
    //                     div.textContent = `${result.first_name} ${result.last_name}`;
    //                     visit.append(div);
    //                 })
    //             }
    //         }
    //     }
    // })


//==========MEDS=========================



//});