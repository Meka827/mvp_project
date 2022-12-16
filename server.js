import express from "express";
import postgres from "postgres";
import nodemon from "nodemon";
import cors from "cors";

// console.log(process.env.DATABASE_URL )
const sql = postgres(process.env.DATABASE_URL);

const app = express();


//=============Middleware=======================================
app.use(express.json());
app.use(express.static("./client"));
app.use(cors()); 


//==============Patient Routes==================================
app.get("/patients", (req, res) => {
    sql`SELECT * FROM patients`.then((results) => {
        res.send(results)
    })
    console.log('is working')
});

app.get("/patients/:id", (req, res) => {
    const id = req.params.id;

    sql`SELECT * FROM patients WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            res.json(result[0]);
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
});

app.post("/patients", (req, res) => {
    const { first_name, last_name, date_of_birth, username, password } = req.body;
    console.log(req.body);
    sql`INSERT INTO patients (first_name, last_name, date_of_birth, username, password) VALUES (${first_name}, ${last_name}, ${date_of_birth}, ${username}, ${password}) 
    RETURNING *`
    .then((results) => {
        res.send(results[0])
    })
});

app.patch("/patients/:id", (req, res) => {
    const id = req.params.id;
    sql`SELECT * FROM patients WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            sql`UPDATE patients SET ${sql(req.body)} WHERE id = ${id} RETURNING *`.then((result) => {
                res.send(result[0])
            })
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
})

app.delete("/patients/:id", (req, res) => {
    const id = req.params.id;
    sql`DELETE FROM patients WHERE id = ${id}`
    .then(() => {res.send('Patient has been deleted')})
});

//==============Providers===============================
app.get("/providers", (req, res) => {
    sql`SELECT * FROM providers`.then((results) => {
        res.send(results)
    })
    console.log('is working')
});

app.get("/providers/:id", (req, res) => {
    const id = req.params.id;

    sql`SELECT * FROM providers WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            res.json(result[0]);
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
});

app.post("/providers", (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    console.log(req.body);
    sql`INSERT INTO providers (first_name, last_name, username, password) VALUES (${first_name}, ${last_name}, ${username}, ${password})
    RETURNING *`
    .then((results) => {
        res.send(results[0])
    })
    
});

app.patch("/providers/:id", (req, res) => {
    const id = req.params.id;
    sql`SELECT * FROM providers WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            sql`UPDATE providers SET ${sql(req.body)} WHERE id = ${id} RETURNING *`.then((result) => {
                res.send(result[0])
            })
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
})

app.delete("/providers/:id", (req, res) => {
    const id = req.params.id;
    sql`DELETE FROM providers WHERE id = ${id}`
    .then(() => {res.send('User has been deleted')})
});

//================SCREENS==================================================
app.get("/screens", (req, res) => {
    sql`SELECT * FROM screens`.then((results) => {
        res.send(results)
    })
    console.log('is working')
});

app.get("/screens/:id", (req, res) => {
    const id = req.params.id;

    sql`SELECT * FROM screens WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            res.json(result[0]);
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
});

app.post("/screens", (req, res) => {
    const { date, patient_id, height, weight, provider_id } = req.body;
    console.log(req.body);
    sql`INSERT INTO screens (date, patient_id, height, weight, provider_id) VALUES ('${date}', ${patient_id}, ${height}, ${weight}, ${provider_id});

    RETURNING *`
    .then((results) => {
        res.send(results[0])
    })
    
});

app.patch("/screens/:id", (req, res) => {
    const id = req.params.id;
    sql`SELECT * FROM screens WHERE id = ${id}`.then((result) => {
        if (result.length !== 0) {
            sql`UPDATE screens SET ${sql(req.body)} WHERE id = ${id} RETURNING *`.then((result) => {
                res.send(result[0])
            })
        } else {
            res.status(404);
            res.set("Content-Type", "text/plain");
            res.send("Not Found");
        };
    })
})

app.delete("/screens/:id", (req, res) => {
    const id = req.params.id;
    sql`DELETE FROM screens WHERE id = ${id}`
    .then(() => {res.send('User has been deleted')})
});



//==============ERROR HANDLERS==============================================
app.use((err, req, res, mext) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
})


app.listen(3000, () => {
    console.log("Server is running")
})