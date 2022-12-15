import express from "express";
import postgres from "postgres";
import nodemon from "nodemon";
import cors from "cors";

const sql = postgres({database: "med_portal"});

const app = express();

app.use(express.json());
app.use(express.static("./client"));
app.use(cors()); 



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
    const { name, dob, height_in, weight_lbs} = req.body;
    console.log(req.body);
    sql`INSERT INTO patients (name, DOB, height_in, weight_lbs) VALUES (${name}, ${dob}, ${height_in}, ${weight_lbs}) 
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
    .then(() => {res.send('User has been deleted')})
});

app.use((err, req, res, mext) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
})


app.listen(3000, () => {
    console.log("Server is running")
})