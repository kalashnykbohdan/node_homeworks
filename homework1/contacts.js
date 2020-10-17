//================================================
// module.exports.log = function test(msg){
//   console.log(msg);
// }

// module.exports.log1 = function test(){
//   console.log('Hello1');
// }

//================================================

const isUuid = require('uuidv4');
const fs = require('fs');
const { promises: fsPromise } = fs;
// const fsPromise = fs.promises;

const path = require('path');
const filename = path.join(__dirname,'db','contacts.json');

module.exports.listContacts = async function listContacts() {
  const file = JSON.parse(await fsPromise.readFile(filename, 'utf-8'))
  console.log(file);
}

module.exports.getContact = async function getContactById(contactId) {
    const contacts = await fsPromise.readFile(filename);
    const config = JSON.parse(contacts);

    // console.log(contactId);

    const conatctFound = config.filter(contact => {
      if(contactId == contact.id){
        return contact;
      }
    })
    console.log(conatctFound);
  }

module.exports.removeContact = async function removeContact(contactId) {
  const contacts = await fsPromise.readFile(filename);
  const config = JSON.parse(contacts);

  const indexDel = config.findIndex(function(item){ return item.id === contactId } );

  if(indexDel !== -1){
    config.splice(indexDel, 1) 
  }
  else{
    console.log("not found element with this contactId")
  }
  
  const configJSON = JSON.stringify(config);
  await fsPromise.writeFile(filename, configJSON);

}

module.exports.addContact = async function addContact(name, email, phone) {
  const newContact = {
    id: isUuid.uuid(),
    // id: 11,
    name: name,
    email: email,
    phone: phone,
  }

  const contacts = await fsPromise.readFile(filename);
  const config = JSON.parse(contacts);
  config.push(newContact);

  const configJSON = JSON.stringify(config);
  await fsPromise.writeFile(filename, configJSON);

} 

