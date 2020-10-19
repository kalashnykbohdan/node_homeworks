const express = require('express');
const mongoose = require('mongoose');
const contactRouter = require('./contacts/contacts.roure')
require("dotenv").config();

module.exports = class UserServer{
     constructor(){
         this.api = null;
     }

     async start(){
         this.initServer();
         this.initMiddlewares();
         this.initRoutes();
         await this.initDatabase();
         this.startListening();


     }

     initServer(){
         this.api = express();
     }

     initMiddlewares(){
         this.api.use(express.json());
     }
     initRoutes(){
         this.api.use('/api', contactRouter);
         
     }

     async initDatabase(){
        // await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
        console.log("Server connect to database");
     }

     startListening(){
        this.api.listen(process.env.PORT, () => {
            console.log("Server listening on port", process.env.PORT);
        });
     }
 }