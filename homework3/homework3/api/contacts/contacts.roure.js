const { Router } = require('express');
const contactController = require('./contacts.controller');

const contactRouter = Router();

contactRouter.post('/contacts', contactController.validateCreateContacts, contactController.createContacts);
contactRouter.get('/contacts', contactController.getContacts);
contactRouter.get('/contacts/:id', contactController.validateId, contactController.getContactById);
contactRouter.put('/contacts/:id', contactController.validateId, contactController.validateUpdateContacts, contactController.updateContactById);
contactRouter.delete('/contacts/:id', contactController.validateId, contactController.deleteContactById);

module.exports = contactRouter;