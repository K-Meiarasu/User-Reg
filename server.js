const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: "",
    port: 
})
try
{
    var sql = "SHOW TABLES LIKE 'register'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE register (user VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
            connection.query(sql, function (err, result) {
                console.log("Table created successfully");
            });
        }
        else{
            console.log("Table already exists !")
        }
    });
}
catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function display(req,res)
{
    var sql = "SELECT * from register"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue"})
        }
        else
        {
           res.json(result)
        }
        console.log(result)
    });
}

app.get('/home',(req,res)=>{
    display(req,res)
})

app.post('/adduser',(req,res)=>{
    var sql = "INSERT INTO register (user, email) VALUES ("+"'"+ req.body.user+"'" +", "+"'"+req.body.email+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.post('/edit',(req,res)=>{
    var sql = " UPDATE register SET email="+"'"+req.body.email+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue"})
        }
        else
        {
            display(req,res)
        }
    });
})

app.get('/remove',(req,res)=>{
    var sql = "DELETE FROM register"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "Database Issue"})
        }
        else
        {
            display(req,res)
        }
    });
})
