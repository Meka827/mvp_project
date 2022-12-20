import express from "express";
import postgres from "postgres";
import nodemon from "nodemon";
import cors from "cors";
import session from "express-session";

// console.log(process.env.DATABASE_URL )
const sql = postgres(process.env.DATABASE_URL);

const app = express();
let loggedin = false;


//=============Middleware=======================================
app.use(express.json());
app.use(express.static("./client"));
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


//==============Patient Routes==================================
app.get("/patients", (req, res) => {
    sql`SELECT * FROM patients`.then((results) => {
        res.send(results)
    })
    console.log('is working')
});

// app.get("/patients/:id", (req, res) => {
//     const id = req.params.id;

//     sql`SELECT * FROM patients WHERE id = ${id}`.then((result) => {
//         if (result.length !== 0) {
//             res.json(result[0]);
//         } else {
//             res.status(404);
//             res.set("Content-Type", "text/plain");
//             res.send("Not Found");
//         };
//     })
// });

app.post("/patients/home", (req, res) => {
    sql`SELECT * FROM patients WHERE username = 'michelle.obama'`
    .then((result) => {
        const first_name = result[0].first_name.charAt(0).toUpperCase() + result[0].first_name.slice(1);
        console.log(loggedin)
        //res.json(req.session.loggedin)
        if (loggedin) {
            let message = {
            welcome: `Welcome ${first_name}!`,
            result: result[0]
        }
		res.json(message);
	} else {
		// Not logged in
		res.json('Please login to view this page!');
	}
})
	//res.end();
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


app.post("/patients/auth", function(req, res) {
console.log(req.body)
    const { username, password } = req.body;
	if (username && password) {
        sql`SELECT * FROM patients WHERE username = ${username}`.then((results) => {
            if (results[0].username === username && results[0].password === password) {
				// Authenticate the user
                sql`UPDATE patients SET online = true WHERE username =${username}`.then((result) => {
                loggedin = true;
				req.session.username = username;
                })
				res.redirect(307, `/patients/home`);

			} else {
				res.json('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.json('Please enter Username and Password!');
		res.end();
	}
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
app.patch("/patient/logged-off", (req, res) => {
    loggedin = false;
}
)

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

app.post("/providers/auth", function(req, res) {
    console.log(req.body)
        const { username, password } = req.body;
        if (username && password) {
            sql`SELECT * FROM providers WHERE username = ${username}`.then((results) => {
                if (results[0].username === username && results[0].password === password) {
                    // Authenticate the user
                    sql`UPDATE providers SET online = true WHERE username =${username}`.then((result) => {
                    loggedin = true;
                    req.session.username = username;  
                    })
                    res.redirect(307, `/providers/home`);
    
                } else {
                    res.json('Incorrect Username and/or Password!');
                }			
                res.end();
            });
        } else {
            res.json('Please enter Username and Password!');
            res.end();
        }
    });

    app.post("/providers/home", (req, res) => {
        sql`SELECT * FROM providers WHERE username = 'monster31'`
        .then((result) => {
            const first_name = result[0].first_name.charAt(0).toUpperCase() + result[0].first_name.slice(1);
            console.log(loggedin)
            //res.json(req.session.loggedin)
            if (loggedin) {
                let message = {
                welcome: `Welcome ${first_name}!`,
                result: result[0]
            }
            res.json(message);
        } else {
            // Not logged in
            res.json('Please login to view this page!');
        }
    })
        //res.end();
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

    sql`SELECT * FROM screens WHERE patient_id = ${id}`.then((result) => {
        if (result.length !== 0) {
            res.json(result);
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
    sql`INSERT INTO screens (date, patient_id, height, weight, provider_id) VALUES (${date}, ${patient_id}, ${height}, ${weight}, ${provider_id})
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