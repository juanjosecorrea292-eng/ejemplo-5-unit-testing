const contactsService = require('../src/contactsService');

describe('Pruebas Unitarias - Servicio de Contactos', () => {
  
  beforeEach(() => {
    contactsService.resetContacts();
  });

  it('Debe obtener todos los contactos iniciales', () => {
    const list = contactsService.getAllContacts();
    expect(list.length).toBe(2);
  });

  it('Debe obtener un contacto por ID de manera correcta', () => {
    const contact = contactsService.getContactById(1);
    expect(contact).toMatchObject({ id: 1, name: 'Juan Perez' });
  });

  it('Debe retornar undefined si el contacto buscado no existe', () => {
    const contact = contactsService.getContactById(999);
    expect(contact).toBeUndefined();
  });

  it('Debe crear un contacto válido exitosamente', () => {
    const nuevo = { name: 'Andres', email: 'andres@gmail.com', phone: '111222' };
    const creado = contactsService.createContact(nuevo);
    
    expect(creado.id).toBe(3);
    expect(creado.name).toBe('Andres');
    expect(contactsService.getAllContacts().length).toBe(3);
  });

  it('Debe lanzar un error si falta el campo name', () => {
    const invalido = { email: 'test@gmail.com' };
    expect(() => contactsService.createContact(invalido)).toThrow('El campo name es requerido.');
  });

  it('Debe lanzar un error si el email no contiene una @', () => {
    const invalido = { name: 'Lucas', email: 'lucasgmail.com' };
    expect(() => contactsService.createContact(invalido)).toThrow('El email debe contener un @.');
  });

  it('Debe actualizar un contacto existente parcialmente', () => {
    const cambios = { name: 'Juan Modificado' };
    const modificado = contactsService.updateContact(1, cambios);
    
    expect(modificado.name).toBe('Juan Modificado');
    expect(modificado.email).toBe('juan@gmail.com'); // Mantiene el previo
  });

  it('Debe eliminar un contacto existente y retornar true', () => {
    const resultado = contactsService.deleteContact(1);
    expect(resultado).toBe(true);
    expect(contactsService.getAllContacts().length).toBe(1);
  });

  it('Debe retornar false si se intenta eliminar un contacto inexistente', () => {
    const resultado = contactsService.deleteContact(999);
    expect(resultado).toBe(false);
  });
});