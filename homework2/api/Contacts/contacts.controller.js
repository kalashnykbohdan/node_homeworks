const Joi = require('joi');

const contacts = [
    {
        id: 1,
        name: "Allen Raymond",
        email: "nulla.ante@vestibul.co.uk",
        phone: "(992) 914-3792"
    },
    {
      id: 2,
      name: "Chaim Lewis",
      email: "dui.in@egetlacus.ca",
      phone: "(294) 840-6685"
    },
    {
      id: 3,
      name: "Kennedy Lane",
      email: "mattis.Cras@nonenimMauris.net",
      phone: "(542) 451-7038"
    },
    {
      id: 4,
      name: "Wylie Pope",
      email: "est@utquamvel.net",
      phone: "(692) 802-2949"
    },
    {
      id: 5,
      name: "Cyrus Jackson",
      email: "nibh@semsempererat.com",
      phone: "(501) 472-5218"
    },
];
class ContactsController {

    get getContacts(){
        return this._getContacts.bind(this);
    }

    get getContactsToId(){
        return this._getContactsToId.bind(this);
    }

    get createContact(){
        return this._createContact.bind(this);
    }

    get updateContact(){
        return this._updateContact.bind(this);
    }

    get deleteContact(){
        return this._deleteContact.bind(this);
    }

    _getContacts(req, res, next){
        return res.json(contacts);
    }

    _getContactsToId(req, res, next){
        try {
            const targetContactIndex = this.findContactByIndex(res, req.params.id);
    
            return res.json(contacts[targetContactIndex]);
            // return contacts.splice(targetContactIndex, 1);

            } catch(err){
                next(err);
            }
    }

    _createContact(req, res, next){
        const newContact = {
            ...req.body,
            id: contacts.length + 1,
        }
        console.log("newContact", newContact);
        contacts.push(newContact);
        console.log("contacts", contacts);
        return res.status(201).send();
    }

    async _updateContact(req, res, next){
        try {
        const targetContactIndex = this.findContactByIndex(res, req.params.id);

        contacts[targetContactIndex] = {
            ...contacts[targetContactIndex],
            ...req.body
        };

        console.log("contacts", contacts);

        return res.status(200).send();
        } catch(err){
            next(err);
        }   
    }

    async _deleteContact(req, res, next){
        try {
        const targetContactIndex = this.findContactByIndex(res, req.params.id);

        contacts.splice(targetContactIndex, 1);

        return res.status(200).send();
        } catch(err){
            next(err);
        }
        
    }

    findContactByIndex(res, contactId){

        const id = parseInt(contactId);

        const targetContactIndex = contacts.findIndex(conatct => conatct.id === id);
        
        if(targetContactIndex === -1){
            throw new NotFoundError('Contact not find');
        }

        return targetContactIndex;

    }

    validateCreateContact(req, res, next) {
        const creatContactRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
        });

        const result = creatContactRules.validate(req.body);
        if( result.error) {
            // return send(result.error);
            return res.status(400).send(result.error);
        }

        next();
    }

    validateUpdateContact(req, res, next){
        const UpdateContactRules = Joi.object({
            name: Joi.string(),
            email: Joi.string(),
            phone: Joi.string(),
        });

        const result = UpdateContactRules.validate(req.body);
        if( result.error) {
            // return send(result.error);
            // return res.status(400).send(result.error);
            console.log('validateUpdateContact_error');
            return res.status(400).send(result.error);
            
        }

        console.log('validateUpdateContact_next');
        next();
    }
    
}

class NotFoundError extends Error {
    constructor(message){
        super(message);

        this.status = 404;
        delete this.stack;
    }
}

module.exports = new ContactsController();

