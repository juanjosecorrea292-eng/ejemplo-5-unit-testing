// Base de datos simulada en memoria
let contacts = [
  { id: 1, name: 'Juan Perez', email: 'juan@gmail.com', phone: '123456' },
  { id: 2, name: 'Maria Lopez', email: 'maria@gmail.com', phone: '654321' }
];
let nextId = 3;

function resetContacts() {
  contacts = [
    { id: 1, name: 'Juan Perez', email: 'juan@gmail.com', phone: '123456' },
    { id: 2, name: 'Maria Lopez', email: 'maria@gmail.com', phone: '654321' }
  ];
  nextId = 3;
}

function getAllContacts() {
  return contacts;
}

function getContactById(id) {
  return contacts.find(c => c.id === Number(id));
}

function createContact(contactData) {
  const { name, email, phone } = contactData;

  // Validaciones obligatorias de lógica de negocio
  if (!name || name.trim() === '') {
    throw new Error('El campo name es requerido.');
  }
  if (!email || email.trim() === '') {
    throw new Error('El campo email es requerido.');
  }
  if (!email.includes('@')) {
    throw new Error('El email debe contener un @.');
  }

  const newContact = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? phone.trim() : undefined
  };

  contacts.push(newContact);
  return newContact;
}

function updateContact(id, updateData) {
  const contact = contacts.find(c => c.id === Number(id));
  if (!contact) return null;

  Object.assign(contact, updateData);
  return contact;
}

function deleteContact(id) {
  const index = contacts.findIndex(c => c.id === Number(id));
  if (index === -1) return false;

  contacts.splice(index, 1);
  return true;
}

module.exports = {
  resetContacts,
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};