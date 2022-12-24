const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

async function invokeAction({ action, name, email, phone, contactId }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;
    case "get":
      await getContactById(contactId);
      break;
    case "remove":
      await removeContact(contactId);
      break;
    case "add":
      await addContact(name, email, phone);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program.option("-a, --action <list>").action((options) => {
  invokeAction({ action: "list" });
});

program.option("-i, --action <get>", "user id").action((options) => {
  const id = options;
  invokeAction({ action: "get", id });
});

program
  .option("-a, --action <add>")
  .option("-n, --name <add>", "user name")
  .option("-e, --email <add>", "user email")
  .option("-p, --phone <add>", "user phone")
  .action((options) => {
    let name,
      email,
      phone = options;
    invokeAction({ action: "add", name, email, phone });
  });

program
  .option("-a, --action <remove>")
  .option("-i, --id", "user id")
  .action((options) => {
    const { id } = options;
    invokeAction({ action: "remove", id });
  });

program.parse();
