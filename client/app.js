fetch("http://localhost:3000/patients")
.then((res) => res.json())
.then((data) => {
    console.log(data);
});



fetch("http://localhost:3000/patients", {
    Method: 'POST',
    Headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
    Body: {
        "name": "Shameka",
        "dob": "1998-08-27",
        "height_in": 65,
        "weight_lbs": 180
      },
    Cache: 'default'
  })