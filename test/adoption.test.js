import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas funcionales del módulo Adopciones', () => {
    
    
    it('GET /api/adoptions debe devolver status 200 y un array', async () => {
        const { statusCode, _body } = await requester.get('/api/adoptions');
        expect(statusCode).to.equal(200);
        expect(_body.payload).to.be.an('array');
    });

    
    it('GET /api/adoptions/:aid debe devolver 404 si la adopción no existe', async () => {
        const fakeId = '64f1a2b3c4d5e6f7a8b9c0d1'; 
        const { statusCode } = await requester.get(`/api/adoptions/${fakeId}`);
        expect(statusCode).to.equal(404);
    });

    
    it('POST /api/adoptions/:uid/:pid debe fallar con 404 si el usuario o mascota no existen', async () => {
        const uid = '64f1a2b3c4d5e6f7a8b9c0d1'; 
        const pid = '64f1a2b3c4d5e6f7a8b9c0d2';
        
        const { statusCode } = await requester.post(`/api/adoptions/${uid}/${pid}`);
        
        
        expect(statusCode).to.be.oneOf([404, 400]); 
    });
});