


const meds = document.querySelector(".meds");
const visit = document.querySelector(".visit");
const header = document.querySelector("header");
const logout = document.querySelector(".logout")

//=============Welcome==================

fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((userData) => {
    for (let i = 0; i < userData.length; i++) {

        if(userData[i].online) {
    const welcome = document.createElement('div');
    welcome.className = 'welcome';
    const first = userData[i].first_name.charAt(0).toUpperCase() + userData[i].first_name.slice(1);
    const last = userData[i].last_name.charAt(0).toUpperCase() + userData[i].last_name.slice(1);
    welcome.textContent = `${first} ${last}'s Appointments`;
    header.append(welcome);
//==========VISITS=======================

        fetch(`http://localhost:3000/screens/${userData[i].id}`)
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
                    } else if(data === 'height') {
                        let div = document.createElement("div");
                        div.textContent = `Height: ${userSreen[check][data]}in.`;
                        screening.append(div);
                    } else if(data === 'weight') {
                        let div = document.createElement("div");
                        div.textContent = `Weight: ${userSreen[check][data]}lbs.`;
                        screening.append(div);
                    } else if (data === 'provider_id') {
                        console.log(data, userSreen[check][data])
                        fetch(`http://localhost:3000/providers/${userSreen[check][data]}`)
                        .then((res) => res.json())
                        .then((result) => {
                            let div = document.createElement("div");
                            const first_n = result.first_name.charAt(0).toUpperCase() + result.first_name.slice(1);
                            const last_n = result.last_name.charAt(0).toUpperCase() + result.last_name.slice(1);                        
                            div.textContent = `Seened by: ${first_n} ${last_n}`;
                            screening.append(div);
                        })
                    }
                    visit.append(screening);
                }
            }
        
        })
        //===========Logout===========================

        logout.addEventListener('click', () => {

            fetch(`http://localhost:3000/patients/${userData[i].id}`, {
                method: 'PATCH',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "online": false
                })
            })
            .then((res) => res.json())
            .then((data) => {
                visit.remove(welcome);
                //visit.remove(screening)
                window.close("patient_profile.html")
            });
        });
        
    }}


//==========MEDS=========================



});

