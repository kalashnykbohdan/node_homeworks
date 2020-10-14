const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");

const feach = require('node-fetch');
const dotenv = require('dotenv');

const app = express();
// const contacts = new Map();

dotenv.config();

app.use(express.json());
// app.use(express.urlencoded());

const PORT = process.env.PORT || 3001;

dotenv.config();
console.log(process.env);
// const contact

app.get("/hello", (req, res, next) => {
    console.log("req.body", req.body);
    res.send("Hello world!!!")
});


app.get('/api/contacts', (req, res, next) => {
    // res.send({
    //     contacts: Array.from(contacts.values());
    // });
});

// app.get('/api/contacts/:contactId', (req, res) => {

// });

// app.post('/api/contacts', (req, res) => {
//     // const { name, email, phone } = req.body;
// });

// app.delete('/api/contacts/:contactId', (req, res) => {

// });

// app.patch('/api/contacts/:contactId', (req, res) => {

// });


// app.use(morgan("tiny"));

// app.use((req, res, next) => {
    
// });

app.listen(PORT, err => err ? console.error(err) : console.log("server start"));

// server.listen(PORT, err => err ? console.error(err) : console.log("server start"));

// app.listen(3000);