const express = require("express");
const USerController = require('./contacts.controller');

const contactsRouter = express.Router();


contactsRouter.get(
    "/contacts",
     USerController.getContacts
     );

contactsRouter.get(
    "/contacts/:id",
    USerController.getContactsToId);

contactsRouter.post(
    "/contacts", 
    USerController.validateCreateContact, 
    USerController.createContact
    );

contactsRouter.put(
    "/contacts/:id",
    USerController.validateUpdateContact, 
    USerController.updateContact
    );

contactsRouter.delete(
    "/contacts/:id", 
    USerController.deleteContact
    );



module.exports = contactsRouter;