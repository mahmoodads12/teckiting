import request from 'supertest';
import { app } from '../../app';

it('clear the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  console.log(response.get('Set-Cookie'));

  const cookie = response.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Expected cookie but got undefined.');
  }
  expect([
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax; httponly',
  ]).toContain(cookie[0]);
});
