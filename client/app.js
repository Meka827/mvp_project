fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((data) => {
    console.log(data);
});