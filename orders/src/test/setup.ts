import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
  var signin: () => string[];
}

// make a fake nats-wrapper in test

jest.mock('../nats-wrapper.ts', () => ({
  natsWrapper: {
    client: {
      publish: jest.fn().mockResolvedValue(undefined), // Beispiel für ein gemocktes publish
    },
    connect: jest.fn().mockResolvedValue(undefined), // Beispiel für eine gemockte connect-Methode
  },
}));

// Mongo Memory Server copy MongoDB in the memory and allow us to test many processes in the same Time without to entry the same MongoDB

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = await MongoMemoryServer.create();
  const mongoURi = mongo.getUri();

  await mongoose.connect(mongoURi, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
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

global.signin = () => {
  // Build a JWT payload. {id, email}

  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // Creat the JWT

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Buil session Object. { jwt: MY_JWT }

  const session = { jwt: token };

  // Turn that session into JSON

  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // return a string thats the cookie with encoded data
  return [`session=${base64}`];
};
