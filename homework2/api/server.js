const express = require("express");
const cors = require("cors");
const contactsRouter = require('./Contacts/contacts.router');
require("dotenv").config();

module.exports = class ContactsServer {

    constructor(){
        this.server = null;
    }
    start(){
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        this.startListening();
    }

    initServer(){
        this.server = express();
    }

    initMiddlewares(){
        this.server.use(express.json());
        this.server.use(cors({ origin: "http://localhost:3000"}));
    }

    initRoutes(){
        this.server.use('/api', contactsRouter);
    }
    
    startListening(){
        this.server.listen(process.env.PORT, () => { 
            console.log("server start on port", process.env.PORT);
        });
    }
}