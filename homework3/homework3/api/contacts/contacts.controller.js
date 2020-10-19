const joi = require('joi');
const contactModel = require('./contacts.model');
const { Types: {ObjectId} } = require('mongoose');

class ContactController {


    async createContacts(req, res, next){

        try {
            const contact = await contactModel.create(req.body);
            return res.status(201).json(contact);
        } catch (error) {
            next(error);
        }

    }

    async getContacts(req, res, next){

        try {
            const contacts = await contactModel.find();
            return res.status(200).json(contacts);
        } catch (error) {
            next(error);
        }

    }

    async getContactById(req, res, next){
        try{

            const contatcId = req.params.id;

            const contact = await contactModel.findById(contatcId);
            if(!contact){
                return res.status(404).send();
            }
            return res.status(200).json(contact);
        } catch (err) {
            next(err);
        }
    }

    async updateContactById(req, res, next){
        try{

            const contatcId = req.params.id;

            const updateContact = await contactModel.findByIdAndUpdate(contatcId
                ,
                {
                $set: req.body,
                }
            );
            
            if(!updateContact){
                return res.status(404).send();
            }
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async deleteContactById(req, res, next){
        try{

            const contatcId = req.params.id;

            const deleteContact = await contactModel.findByIdAndDelete(contatcId);
            // console.log(deleteContact);
            if(!deleteContact){
                return res.status(404).send();
            }
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    validateCreateContacts(req, res, next){

        const validationRules = joi.object({
            name: joi.string().required(),
            email: joi.string().required(),
            phone: joi.string().required(),
        });

        const result = validationRules.validate(req.body);
        if( result.error) {
            // return send(result.error);
            return res.status(400).send(result.error);
        }

        next();

    }

    validateUpdateContacts(req, res, next){

        const validationRules = joi.object({
            name: joi.string(),
            email: joi.string(),
            phone: joi.string(),
        });

        const result = validationRules.validate(req.body);
        if( result.error) {
            // return send(result.error);
            return res.status(400).send(result.error);
        }

        next();
    }

    validateId(req, res, next){

        const { id } = req.params;

        if(!ObjectId.isValid(id)){
            return res.status(400).send();
        }
        next();
    }



}

module.exports = new ContactController();