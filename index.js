const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
// const { program } = require("commander");

async function invokeAction({ action, name, email, phone, contactId }) {
  switch (action) {
    case "list":
      console.log("invoke list");
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case "get":
      console.log("invoke get", contactId);
      await getContactById(contactId);
      break;
    case "remove":
      console.log("invoke remove", contactId);
      await removeContact(contactId);
      break;
    case "add":
      console.log("invoke add", name, email, phone);
      await addContact(name, email, phone);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({ action: "list" });
