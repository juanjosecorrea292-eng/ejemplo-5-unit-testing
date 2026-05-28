const request = require('supertest');
const { app, resetContacts } = require('../src/app');

describe('API de Contactos (Integration Tests)', () => {
  
  beforeEach(() => {
    resetContacts();
  });

 
  it('1. GET /api/contacts devuelve status 200 y un array', async () => {
    const res = await request(app).get('/api/contacts');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2); 
  });


  it('2. GET /api/contacts/:id devuelve el contacto correcto', async () => {
    const res = await request(app).get('/api/contacts/1');
    
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Juan Perez' });
  });


  it('3. GET /api/contacts/:id devuelve 404 para un ID inexistente', async () => {
    const res = await request(app).get('/api/contacts/999');
    
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Contacto no encontrado.');
  });

  it('4. POST /api/contacts crea el contacto y devuelve 201 con el objeto creado', async () => {
    const nuevo = { name: 'Luis Gomez', email: 'luis@gmail.com', phone: '789456' };
    const res = await request(app).post('/api/contacts').send(nuevo);
      
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 3, name: 'Luis Gomez' });
  });

  
  it('5. POST /api/contacts devuelve 400 si falta el name', async () => {
    const sinNombre = { email: 'test@gmail.com' };
    const res = await request(app).post('/api/contacts').send(sinNombre);
      
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/name/i);
  });


  it('6. POST /api/contacts devuelve 400 si el email no tiene @', async () => {
    const emailInvalido = { name: 'Pedro', email: 'pedrogmail.com' };
    const res = await request(app).post('/api/contacts').send(emailInvalido);
      
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/@/i);
  });


  it('7. PUT /api/contacts/:id actualiza correctamente los campos enviados', async () => {
    const cambios = { name: 'Juan Modificado', phone: '000000' };
    const res = await request(app).put('/api/contacts/1').send(cambios);
      
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Juan Modificado', email: 'juan@gmail.com' });
  });


  it('8. DELETE /api/contacts/:id elimina el contacto y devuelve confirmación', async () => {
    const res = await request(app).delete('/api/contacts/1');
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Contacto eliminado.');

    const resGet = await request(app).get('/api/contacts');
    expect(resGet.body.length).toBe(1);
  });


  it('9. DELETE /api/contacts/:id devuelve 404 para ID inexistente', async () => {
    const res = await request(app).delete('/api/contacts/999');
    
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Contacto no encontrado.');
  });

});