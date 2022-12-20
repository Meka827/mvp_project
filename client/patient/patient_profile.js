


const meds = document.querySelector(".meds");
const visit = document.querySelector(".visit");
const header = document.querySelector("header");

//=============Welcome==================

fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((userData) => {
    console.log(userData)
const welcome = document.createElement('div');
welcome.textContent = `${userData[0].first_name} ${userData[0].last_name} Appointments`;
header.append(welcome);
//==========VISITS=======================

    fetch(`http://localhost:3000/screens/${userData[0].id}`)
    .then((res) => res.json())
    .then((userSreen) => {
        for(let check in userSreen) {
            console.log(userSreen)
            let screening = document.createElement('div');
            screening.className = 'screenings';
            for(let data in userSreen[check]){
                if(data === 'date'){
                    let date = userSreen[check][data].slice(0, 10);
                    let dateARR = date.split('-');
                    let slashDate = `${dateARR[1]}/${dateARR[2]}/${dateARR[0]}`
                    let div = document.createElement("div");
                    div.textContent = slashDate;
                    screening.append(div);
                } else if(data === 'weight' || data === 'height') {
                    let div = document.createElement("div");
                    div.textContent = userSreen[check][data];
                    screening.append(div);
                } else if (data === 'provider_id') {
                    console.log(data, userSreen[check][data])
                    fetch(`http://localhost:3000/providers/${userSreen[check][data]}`)
                    .then((res) => res.json())
                    .then((result) => {
                        let div = document.createElement("div");
                        div.textContent = `${result.first_name} ${result.last_name}`;
                        screening.append(div);
                    })
                }
                visit.append(screening);
            }
        }
    })


//==========MEDS=========================



});