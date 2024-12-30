import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created.publisher';

console.clear();

// stan is revert wort from nats
// stan === client

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// connected
stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
      userId: '2356415',
    });
  } catch (err) {
    console.log(err);
  }
});
