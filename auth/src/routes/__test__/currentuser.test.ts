import request from 'supertest';
import { app } from '../../app';

it('currentuser', async () => {
  // because we dont have sharing cookie like in postman we must manual cookie sharing from signup to currentuser
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  console.log(response.body);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authentificated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
