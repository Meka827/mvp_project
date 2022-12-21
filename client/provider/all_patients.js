let btnGet = document.querySelector('button');
let myTable = document.querySelector('#table');

fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((userData) => {
    console.log(userData[1])
    for(let i = 0; i < userData.length; i++) {
        
        fetch(`http://localhost:3000/screens/${userData[i].id}`)
        .then((data) => data.json())
        .then((result) => {
            let headers = ['Name', 'Date of Birth', 'Height', "Weight"];

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.append(textNode);
        headerRow.append(header);
    });
    table.append(headerRow);
    result.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.append(textNode);
            row.append(cell);
        })
        table.append(row);
    });
    myTable.append(table);

        })
    }

});

// let headers = ['Name', 'Date of Birth', 'Height', "Weight"];
// btnGet.addEventListener('click', () => {
//     let table = document.createElement('table');
//     let headerRow = document.createElement('tr');
//     headers.forEach(headerText => {
//         let header = document.createElement('th');
//         let textNode = document.createTextNode(headerText);
//         header.appendChild(textNode);
//         headerRow.appendChild(header);
//     });
//     table.appendChild(headerRow);
//     employees.forEach(emp => {
//         let row = document.createElement('tr');
//         Object.values(emp).forEach(text => {
//             let cell = document.createElement('td');
//             let textNode = document.createTextNode(text);
//             cell.appendChild(textNode);
//             row.appendChild(cell);
//         })
//         table.appendChild(row);
//     });
//     myTable.appendChild(table);
// });