const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const db = JSON.parse(data);
  return db;
}

async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function getContactById(contactId) {
  const db = await listContacts();
  const result = db.find((contact) => contact.id === contactId);
  return result;
}

async function removeContact(contactId) {
  const db = await listContacts();
  const updatedDb = db.filter((contact) => contact.id !== contactId);
  await writeContacts(updatedDb);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { name, email, phone, id };
  const db = await listContacts();
  db.push(contact);
  await writeContacts(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
