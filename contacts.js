const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const db = JSON.parse(data);
  return db;
}

async function getContactById(contactId) {
  const db = await listContacts();
  return db.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const db = await listContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedDb, null, 4));
}

async function addContact(name, email, phone) {
  const contact = { name, email, phone };
  const db = await listContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
