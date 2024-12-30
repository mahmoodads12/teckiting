import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

// Mongo Memory Server copy MongoDB in the memory and allow us to test many processes in the same Time without to entry the same MongoDB

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoURi = mongo.getUri();

  await mongoose.connect(mongoURi, {});
});

beforeEach(async () => {
  process.env.JWT_KEY = 'asdf';
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Failed to get cookie from response');
  }
  return cookie;
};
